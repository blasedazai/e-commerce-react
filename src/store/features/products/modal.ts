export type ICtagory ={
    name: string,
    selected: boolean
}

export type IProducts ={
    categories: Array<ICtagory>
    filteredCategories: Array<ICtagory>
    list: Array<any>
    filteredList: Array<any>
    filteredCount:number
    details:any
}