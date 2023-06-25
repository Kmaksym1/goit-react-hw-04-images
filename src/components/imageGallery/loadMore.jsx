// import { Component } from "react";
import css from "./image.module.css";

export const LoadMore =  (props) =>{
    return (
      <button onClick={props.onClick} className={css.loadMore}>Load More</button>
    );
  }
