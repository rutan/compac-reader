import { Buffer } from 'buffer';

export default {
    encode(str) {
        return new Buffer(str).toString('base64');
    },
    decode(str) {
        return new Buffer(str, 'base64').toString();
    }
};
