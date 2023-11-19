export default function Avatar({size, url}) {
    let width = "w-12";
    if (size === "big"){
        width = "w-20 md:36";
    }
    return(
        <div className={`${width} rounded-full overflow-hidden`}>
            <img src={url} alt=""></img>
        </div>
    );
}