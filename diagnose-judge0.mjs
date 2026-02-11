import fetch from 'node-fetch';

async function diagnose() {
    const Judge0_IP = process.env.JUDGE0_SERVER_IP;
    console.log(`JUDGE0_SERVER_IP: ${Judge0_IP}`);

    if (!Judge0_IP) {
        console.error("ERROR: JUDGE0_SERVER_IP is not set.");
        return;
    }

    const url = `${Judge0_IP.startsWith('http') ? '' : 'http://'}${Judge0_IP}/about`;
    console.log(`Pinging: ${url}...`);

    try {
        const res = await fetch(url);
        if (res.ok) {
            console.log("SUCCESS: Judge0 is reachable!");
            const data = await res.json();
            console.log("Judge0 Version:", data.version);
        } else {
            console.error(`FAILURE: Judge0 returned status ${res.status}`);
        }
    } catch (err) {
        console.error("ERROR: Failed to connect to Judge0:", err.message);
    }
}

diagnose();
