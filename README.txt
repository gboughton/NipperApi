Nipper API
Grant Boughton

Requirements:
    Node.js 8.11.1 (https://nodejs.org/en/)
    Node Package Manager (npm)
    
Usage:
    First time setup:
        1. open command prompt and navigate to NipperApi directory
        2. enter "npm install" in command prompt to install all dependencies in package.json
        
    Every other time:
        1. enter "node index.js" in command prompt to start the express server
        2. command prompt should say "Waiting" to indicate server is running
        3. in any browser type "localhost:3000/data" into the url
    
    Features:
        * search bar (if left empty will show entire dataset)
        * sorting by clicking table header