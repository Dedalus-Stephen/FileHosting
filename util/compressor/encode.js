//12,13,14,16,45
//14,16,25,45
//25,30,45
//45,55
//100

//"abbccc"
const start = (message) => {
    const data = [...message];
    data.sort((a, b) => a-b)
    let chardpay = data
    const charfreq = countFreq(chardpay); 
    chardpay = [...new Set(chardpay)] //TODO: check if possible to write better performance custom duplicate checker
    let n = chardpay.length;
    let q = [];
    return encode(chardpay, charfreq, n, q, message);
}

const countFreq = (arr) => {
    let n = arr.length;

    let i = 0;

    let res = [];

    while (i < n) {
        let c = arr[i];
        let tempCount = 1;
        i++;
        while (i < n && arr[i] === c) {
            tempCount++;
            i++;
        }
        res.push(tempCount);
    }
    return res;
}

function encode(chardpay, charfreq, n, q, message) {

    for (let i = 0; i < n; i++) {
        let hn = new Node();

        hn.data = charfreq[i];
        hn.c = chardpay[i];

        hn.left = null;
        hn.right = null;

        insert(hn, q);
    }

    let root = new Node();

    while (q.length > 1) {
        let f = q.shift();
        let r = q.shift();

        let tempNode = new Node();

        tempNode.data = f.data + r.data;
        tempNode.c = '-';

        tempNode.left = f;
        tempNode.right = r;

        root = tempNode;

        insert(tempNode, q);
    }
    tree = root;
    const map = new Map();
    createMap(root, '', map);
    const compressed = compress(message, map);
    return {tree, compressed};
}

function createMap(root, code, map) {
    if (root && root.left
        === null
        && root.right
        === null
        && root.c !== '') {
        map.set(root.c, code);
        return;
    }

   root && createMap(root.left, code + '0', map)
   root && createMap(root.right, code + '1', map)
}

function insert(node, q) {
    let i = q.length - 1;
    let x = node.data;

    while (q[i] && x < q[i].data && i >= 0) {
        q[i + 1] = q[i];
        i--;
    }

    q[++i] = node;
}

class Node {
    data;
    c;

    left;
    right;
}


const compress = (message, map) => {
    console.log(map.size, "map size")
    let res = '';
    for (let i = 0; i < message.length; i++) {
        res += map.get(message[i]);
    }
    return res
}


module.exports = start;