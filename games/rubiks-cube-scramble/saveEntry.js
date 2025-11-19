import { beurl } from "../../utility/js/constants.js";

async function saveToDB(time, scramble) {
    if (size === 3) {
        const url = beurl + 'v1/rubiks-cube-timer';
        const type = `C${size}x${size}`;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidGVzdEB0ZXN0Iiwic3ViIjoidGVzdEB0ZXN0IiwiaWF0IjoxNzYzNDg4NDM2LCJleHAiOjE3NjYwODA0MzZ9.gF3ANeByB39Mf-TJxdBDxbVOeHUh_d_bptNQkjjKb8Q'
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
