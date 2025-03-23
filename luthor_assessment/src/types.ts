export type ViolationData = {
    id: string,
    text: string, 
    start: number, 
    end: number, 
    length: number, 
    type: string, 
    message: string,
    severity: string
}

export type SuggestionData = {
    string: Array<string>
}