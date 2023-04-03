import React from "react";

export default function NewsItem(props) {

  const darkCardStyle = {
    backgroundColor: 'black',
    color: 'white'
  }
  const lightCardStyle = {
    backgroundColor: 'white',
    color: 'black'
  }

  return (
    <div>
      <div className="card" style={props.mode === 'dark' ? darkCardStyle : lightCardStyle}>
        <span style={{color: "white", left: "80%"}} className="position-absolute top-0 translate-middle badge bg-danger">
          {props.source}
        </span>
        <img src={props.urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text">
            <small className="text-muted">
              {props.author && <p>By {props.author}</p>}
              {props.time && <p>On {props.time}</p>}
            </small>
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href={props.url}
            className={`btn btn-outline-${props.mode==='light'? 'dark' : 'secondary'}`}
          >
            Read More..
          </a>
        </div>
      </div>
    </div>
  );
}
