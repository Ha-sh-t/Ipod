

// menuData.js
export const menuData = {

    id:"root",
    title:"Menu",
    type:"list",
    children:[
        {
            id:"cover_flow",
            title:"Cover Flow",
            type:"content",
            content:"coverFlow"

        },
        {
            id:"music",
            title:"Music",
            type:"list",
            children:[
                {id:"all_songs" , title:"All Songs" , type:"content" , content:"music"},
                {id:"artists" , title:"Artists" , type:"list" , children:[]},
                {id:"albums",title:"Albums" , type:"content" , content:"album"}
            ]
        },
        {
            id:"game",
            title:"Game",
            type:"content",
            content:"game"
        },
        {
            id:"settings",
            title:"Settings",
            type:"content",
            content:"setting"
        }
    ]

}


