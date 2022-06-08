export const digimonModel = {
    name : '' ,
    iconSource: '',
    level: {
        _id: '',
        name: ''
    },
    attribute: {
        _id: '',
        name: ''
    },
    userCreator: '',
    priorForms: [],
    nextForms: [],
    information: '',
    attacks: [],
    design: ''
}

export const levelOptions = [
    {_id: 0, name: "Baby"}, 
    {_id: 1, name: "In-Training"}, 
    {_id: 2, name: "Rookie"},
    {_id: 3, name: "Champion"},
    {_id: 4, name: "Ultimate"},
    {_id: 5, name: "Mega"}
];

export const attributeOptions = [
    {_id: 0, name: "Vaccine"},
    {_id: 1, name: "Data"},
    {_id: 2, name: "Virus"},
    {_id: 3, name: "Free"},
    {_id: 4, name: "Variable"},
    {_id: 5, name: "Unknown"},
]