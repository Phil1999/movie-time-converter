const baseURL = 'http://localhost:3000/format-runtime';


const testMicroservice = async (runtime: number) => {
    try {
        // Construct the query string.
        const url = `${baseURL}?runtime=${runtime}`;

        console.log(`[INFO] Sending request to: ${url}`);

        // Make a GET request
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`[ERROR] Request failed with status: ${response.status}`);
            return;
        }

        // Parse and log the JSON response
    const data = await response.json();
    console.log(`[SUCCESS] Response from microservice:`, data);
  } catch (error) {
    console.error(`[ERROR] An error occurred: ${error.message}`);
  }
    
}

// Test microservice with differnt inputs
(async () => {
    console.log('[TEST] Calling microservice with runtime = 134');
    await testMicroservice(134); // Expected: 2hr 14min
    
    console.log('\n[TEST] Calling microservice with runtime = 9999');
    await testMicroservice(9999); // Expected: 166hr 39min
    
    console.log('\n[TEST] Calling microservice with runtime = -10');
    await testMicroservice(-10); // Expected: Error (runtime must be positive)
})();