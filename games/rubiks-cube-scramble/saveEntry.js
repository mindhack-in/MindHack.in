import { beurl } from "../../utility/js/constants.js";

async function saveToDB(time, scramble) {
    if (size === 3) {
        const url = beurl + 'v1/rubiks-cube-timer';
        const type = `C${size}x${size}`;
        const token=localStorage.getItem("token")
        if(token===null)
        {
            return;
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: '{"scramble":"' + scramble + '","solveTimeMs":"' + time * 1000 + '","cubeType":"' + type + '"}'
        };


        try {
            const response = await fetch(url, options);
            const data = await response.text;
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }
}
window.saveToDB = saveToDB;
