export interface MessageInterface {
    'id': string,
    'type': string,
    'sendBy': string,
    'sendTo': string,
    'created_at': Date,
    'updated_at': Date,
    'deleted_at': Date,
    'isReading': Boolean,
    'isHistored': Boolean,
    'content': string
}