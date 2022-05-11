
export const Label = ( {name}) => {
    return(
        <div className="label">
            <div className="label__dot"/>
            <p className="label__name">{name}</p>
        </div>
    )
}