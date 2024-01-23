const categories = [
    {
        "_id": "1",
        "name": "강아지"
    },
    {
        "_id": "2",
        "name": "고양이"
    },
]

const prices = [
    {
        "_id": 0,
        "name": "모두",
        "array": []
    },
    {
        "_id": 1,
        "name": "0 ~ 1999원",
        "array": [0, 1999]
    },
    {
        "_id": 2,
        "name": "2000 ~ 3999원",
        "array": [2000, 3999]
    },
    {
        "_id": 3,
        "name": "4000 ~ 5999원",
        "array": [4000, 5999]
    },
    {
        "_id": 4,
        "name": "6000 ~ 7999원",
        "array": [6000, 7999]
    },
    {
        "_id": 5,
        "name": "8000 ~ 9999원",
        "array": [8000, 9999]
    },
    {
        "_id": 6,
        "name": "10000원 이상",
        "array": [10000, 9999999]
    },
]

export {
    categories,
    prices
}