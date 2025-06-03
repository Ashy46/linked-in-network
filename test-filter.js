// Simple test script for the LinkedIn MCP filter endpoint
// Run with: node test-filter.js

async function testLinkedInFilter() {
  try {
    console.log('🔍 Testing LinkedIn MCP Filter endpoint...\n');
    
    const response = await fetch('http://localhost:3000/api/mcp/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Response:');
      console.log('📊 Summary:', data.summary);
      console.log('🎯 Filter Criteria:', data.filterCriteria);
      console.log('📈 Total Results Found:', data.metadata?.totalResultsFound);
      console.log('✨ Filtered Results:', data.metadata?.filteredResultsCount);
      
      if (data.profiles && data.profiles.length > 0) {
        console.log('\n👥 Top Profiles:');
        data.profiles.slice(0, 3).forEach((profile, index) => {
          console.log(`\n${index + 1}. ${profile.name}`);
          console.log(`   📊 Relevance Score: ${profile.relevanceScore}/100`);
          console.log(`   🏢 Company: ${profile.company}`);
          console.log(`   🎓 Education: ${profile.education}`);
          console.log(`   💡 Match Reason: ${profile.matchReason}`);
        });
      }
    } else {
      console.log('❌ Error Response:');
      console.log(JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('💥 Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your Next.js server is running:');
      console.log('   npm run dev');
    }
  }
}

// Run the test
testLinkedInFilter(); 