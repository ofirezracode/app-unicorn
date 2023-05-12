export function TextLine({text, length}){

const content=text.length>length?text.substring(0,length)+'...':text
    return(
content
    )
}