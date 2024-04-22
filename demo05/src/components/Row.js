
const Row = (props)=>{
    
    return (
        <div className="row mt-4">
            <div className="col text-end">
                {props.children}
            </div>
        </div>
    );
};

export default Row;