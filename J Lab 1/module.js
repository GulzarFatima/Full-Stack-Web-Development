//create any array 
//two functions:
//give export before the function name
//1. adding item to an array 
//2. getting the length of the array

const items = (() => {
    
    let items = [];


// functions
// 1. adding item to an array
function addItem(item)
{
    items.push(item);
}
// 2. getting length of the array
function getItemCount()
{
    return items.length;
}
return {
    addItem,
    getItemCount
}
}
)();

// export the functions
export const addItem = items.addItem;
export const getItemCount = items.getItemCount;