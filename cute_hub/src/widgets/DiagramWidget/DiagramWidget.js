import React from 'react';
import {useState, useEffect} from 'react'
import './DiagramWidget.css';
import DiagramSVG from '../../components/DiagramSVG/DiagramSVG'
import DiagramList from '../../components/DiagramList/DiagramList'

export default function DiagramWidget() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? <DiagramList /> : <DiagramSVG />;
}
