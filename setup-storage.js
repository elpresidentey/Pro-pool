// You need to get these from your Supabase dashboard
const PROJECT_ID = 'irfptgmnhcormzjhmzuh';
const PROJECT_URL = 'https://irfptgmnhcormzjhmzuh.supabase.co';

// Get this from: Settings > API Keys > Service Role Key (copy from Supabase dashboard)
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  console.error('Please set it with: $env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
  process.exit(1);
}

async function createBucket(bucketName) {
  try {
    console.log(`\n📦 Creating bucket: ${bucketName}...`);
    
    const url = `${PROJECT_URL}/storage/v1/b`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: bucketName,
        public: true,
      }),
    });

    if (response.ok) {
      console.log(`✅ Bucket "${bucketName}" created successfully`);
      return true;
    } else if (response.status === 400) {
      const error = await response.json();
      if (error.message?.includes('already exists')) {
        console.log(`✅ Bucket "${bucketName}" already exists`);
        return true;
      }
      console.error(`❌ Error: ${error.message}`);
      return false;
    } else {
      const error = await response.text();
      console.error(`❌ Error [${response.status}]: ${error}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Failed to create bucket: ${error.message}`);
    return false;
  }
}

async function createPolicy(bucketName, policyName, operation, expression) {
  try {
    console.log(`\n🔐 Creating policy: ${policyName} (${operation})...`);
    
    const response = await fetch(`${PROJECT_URL}/rest/v1/storage.buckets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // For now, just log that policies need to be set up in the dashboard
    console.log(`ℹ️  Policy "${policyName}" - Please add this manually in Supabase Dashboard`);
    return true;
  } catch (error) {
    console.error(`⚠️  Could not verify policy: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting storage setup...\n');

  // Create buckets
  await createBucket('profiles');
  await createBucket('portfolio');

  console.log('\n' + '='.repeat(60));
  console.log('📋 NEXT STEPS - Add Storage Policies:');
  console.log('='.repeat(60));
  console.log('\n1. Go to: https://app.supabase.com/project/' + PROJECT_ID + '/storage');
  console.log('2. Click on "profiles" bucket → "Policies" tab');
  console.log('3. Click "+ New Policy" and add:\n');
  console.log('   Policy Name: Enable insert for authenticated users');
  console.log('   Target roles: authenticated');
  console.log('   Operations: INSERT');
  console.log('   WITH CHECK: (bucket_id = \'profiles\')\n');
  console.log('4. Click "+ New Policy" again and add:\n');
  console.log('   Policy Name: Enable public read');
  console.log('   Target roles: anon, authenticated');
  console.log('   Operations: SELECT');
  console.log('   USING: (bucket_id = \'profiles\')\n');
  console.log('5. Repeat steps 2-4 for "portfolio" bucket (change \'profiles\' to \'portfolio\')\n');
  console.log('='.repeat(60));
}

main();
