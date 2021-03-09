import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import './DiagramSVG.css';

function valveState(state){
    if(state == "1"){
        return '#008000'
    }
    else{
        return '#FF0000'
    }
  }
  
  function scaleTemp(temp){
    let T = parseFloat(temp);
    if(T < 1.0){
      return (T*1e3).toPrecision(4)+' mK';
    }
  
    return T.toPrecision(4)+' K';
  }
  
  export default function DiagramSVG(){
    const [data, setData] = useState({"Time":"2021-02-18 00:36:40","Pumping turbo speed":" 0.00","P1":"2.35394","K3":" 389.4","K4":"   5.5","FLOW":" -0.0","K5":"  -0.0","K6":" 881.7","PT 100 Bidon C":"  23.2","P\/T":"89.618","K8":"  10.6","K10":"   0.5","P2":"1155.79700","P3":"1300","BM - MC":"  0.0000","LAST RUN":"  0.0000","RuO2 MC":"  0.00000","RuO2 CP":"  0.00000","Cernox STILL":"  0.00000","Cernoc MC":"  0.00000","4K STAGE":"  0.00000","60K STAGE":"  0.00000","dffsf":"  0.00000","Still bottom":"  0.00000","MC bottom":"  0.00000","R MMR1 1":"     0.000","R MMR1 2":"     0.000","R MMR1 3":"     0.000","R MMR2 1":"     0.000","R MMR2 2":"     0.000","R MMR2 3":"     0.000","R MMR3 1":"     0.000","R MMR3 2":"     0.000","R MMR3 3":"     0.000","VE1":"1","VE2":"1","VE3":"0","VE4":"0","VE5":"0","VE6":"0","VE7":"0","VE8":"0","VE9":"0","VE10":"0","VE11":"0","VE12":"0","VE13":"0","VE14":"0","VE15":"0","VE16":"0","VE17":"0","VE18":"0","VE19":"0","VE20":"0","VE21":"0","VE22":"0","VE23":"0","VE24":"0","VE25":"0","VE26":"0","VE27":"0","VE28":"0","VE29":"0","VE30":"0","VE31":"0","VE32":"0","VE33":"0","VE34":"0","VE35":"0","VE36":"0","VE37":"0","VE38":"0","VE39":"0","PP pomp":"0","comp":"0","PP aux":"0","Turbo AUX":"0","PT":"0","turbo Pomp":"0","mot7":"0","mot8":"0","mot9":"0"})
  
    // const [posts, setPosts]=useState([]) 'https://jsonplaceholder.typicode.com/posts'
    const getData = async () => {
    try {
      const fridge = await axios.get("https://cdms-webapp.slac.stanford.edu/www/cute/fridge/status.php")
      setData(fridge.data);  // set State
    
    } catch (err) {
      console.error(err.message);
      }
    };
    
    useEffect(()=>{
      getData()
  
      const interval=setInterval(()=>{
        getData()
       },10000)
         
         
       return()=>clearInterval(interval)
    },[])  // includes empty dependency array
    let svgObject = <div className="container-fluid diag">
    <div className="row">
      <div className="col col-lg-8">
        <p>Last Updated: <span id="clock">{data.Time}</span></p>
      </div>
    </div>
    <div className="row">
      <div className="col col-lg-10">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="100%"  viewBox="0 0 1645.3846 929">
          <title>FridgeDiagram</title>
          <g>
            <rect className="cls-1" x="384.6119" y="31.228" width="391.3864" height="96.061" rx="12" ry="12"/>
            <text className="cls-2" transform="translate(403.938 62.228)">OVC</text>
          </g>
          <rect className="cls-3" x="616.9462" y="44.228" width="108" height="36"/>
          <rect className="cls-3" x="616.9462" y="80.228" width="108" height="36"/>
          <text className="cls-2" transform="translate(627.6513 67.2681)"><tspan white-space="preserve">MC temp</tspan></text>
          <text id="mctemp" className="cls-2" transform="translate(623.8393 103.2681)">{scaleTemp(data["Cernoc MC"])}</text>
          <circle id="V1" className="cls-4" cx="670.9582" cy="148.967" r="18" fill={valveState(data.VE1)}/>
          <text className="cls-5" transform="translate(664.8026 156.011)">1</text>
          <circle id="V8" className="cls-4" cx="1006.1623" cy="474.25" r="18" transform="translate(299.4346 1433.1857) rotate(-86.8636)" fill={valveState(data.VE8)}/>
          <text className="cls-5" transform="matrix(0.9985, 0.0547, -0.0547, 0.9985, 821.4922, 461.1746)">8</text>
          <circle id="V5" className="cls-4" cx="280.6665" cy="820.2506" r="18" transform="translate(-731.8496 1035.8465) rotate(-86.8636)" fill={valveState(data.VE5)}/>
          <text className="cls-5" transform="matrix(0.9985, 0.0547, -0.0547, 0.9985, 95.9963, 807.1752)">5</text>
          <circle id="V9" className="cls-4" cx="680.2727" cy="820.2506" r="18" transform="translate(-354.107 1434.8541) rotate(-86.8636)" fill={valveState(data.VE9)}/>
          <text className="cls-5" transform="matrix(0.9985, 0.0547, -0.0547, 0.9985, 495.6026, 807.1752)">9</text>
          <circle id="TD" className="cls-4" cx="670.9462" cy="291.2061" r="36" fill={valveState(data['turbo Pomp'])}/>
          <text className="cls-5" transform="translate(657.0026 298.25)">TD</text>
          <g>
            <circle id="TA" className="cls-4" cx="420.6119" cy="218.2194" r="36" fill={valveState(data['turbo AUX'])}/>
            <text className="cls-6" transform="translate(396.1917 225.2633)">T<tspan className="cls-7" x="10.1279" y="0">A</tspan><tspan className="cls-8" x="24.5278" y="0">ux</tspan></text>
          </g>
          <g>
            <rect id="PT" className="cls-4" x="111.585" width="255.0269" height="48.6467" rx="12" ry="12" fill={valveState(data['PT'])}/>
            <text className="cls-9" transform="translate(159.0894 34.7075)"><tspan className="cls-10">P</tspan><tspan x="18.6118" y="0">ulse</tspan><tspan className="cls-11" x="79.2349" y="0"> </tspan><tspan className="cls-12" x="85.3911" y="0">T</tspan><tspan x="101.6631" y="0">ube</tspan></text>
          </g>
          <circle id="V2" className="cls-4" cx="670.9462" cy="454.478" r="18" fill={valveState(data.VE2)}/>
          <text className="cls-5" transform="translate(664.7904 461.522)">2</text>
          <circle id="PPD" className="cls-4" cx="670.9462" cy="557.7278" r="36" fill="#4e9cff"/>
          <text className="cls-5" transform="translate(650.1867 564.7722)">PPD</text>
          <g>
            <circle id="PPA" className="cls-4" cx="215.1346" cy="341.4447" r="36" fill={valveState(data['turbo aux'])}/>
            <text className="cls-5" transform="translate(184.0186 348.4887)">P<tspan className="cls-13" x="12.7681" y="0">P</tspan><tspan className="cls-7" x="23.52" y="0">A</tspan><tspan x="37.9199" y="0">ux</tspan></text>
          </g>
          <circle id="Comp" className="cls-4" cx="399.0095" cy="870.25" r="36" fill={valveState(data['comp'])}/>
          <text className="cls-5" transform="translate(368.7695 877.2939)"><tspan className="cls-14">C</tspan><tspan x="13.6563" y="0">omp</tspan></text>
          <circle id="V3" className="cls-4" cx="670.9582" cy="800.4786" r="18" fill={valveState(data.VE3)}/>
          <text className="cls-5" transform="translate(664.8024 807.5225)">3</text>
          <g>
            <rect className="cls-3" x="259.8848" y="104.1527" width="108" height="36"/>
            <rect className="cls-3" x="259.8848" y="140.1527" width="108" height="36"/>
            <text id="P3" className="cls-2" transform="translate(277.19 127.1927)">{parseFloat(data.P3)}</text>
            <text className="cls-2" transform="translate(275.7374 163.1927)">P3 - mb</text>
          </g>
          <g>
            <rect className="cls-3" x="366.6119" y="305.4447" width="108" height="36"/>
            <rect className="cls-3" x="366.6119" y="341.4447" width="108" height="36"/>
            <text id="P2" className="cls-2" transform="translate(383.917 328.4847)">{parseFloat(data.P2)}</text>
            <text className="cls-2" transform="translate(382.4644 364.4847)">P2 - mb</text>
          </g>
          <rect className="cls-3" x="156.3965" y="488.5006" width="108" height="36"/>
          <rect className="cls-3" x="156.3965" y="524.5006" width="108" height="36"/>
          <text id="flow" className="cls-2" transform="translate(204.2407 511.5406)">{parseFloat(data['FLOW'])}</text>
          <text className="cls-2" transform="translate(181.813 547.5406)">u mol</text>
          <rect className="cls-3" x="48.5284" y="662.2061" width="108" height="36"/>
          <rect className="cls-3" x="48.5284" y="698.2061" width="108" height="36"/>
          <text id="K5" className="cls-2" transform="translate(96.3726 685.2461)">{parseFloat(data.K5)}</text>
          <text className="cls-2" transform="translate(64.2613 721.2461)">K5 - mb</text>
          <rect className="cls-3" x="403.8616" y="662.2061" width="108" height="36"/>
          <rect className="cls-3" x="403.8616" y="698.2061" width="108" height="36"/>
          <text id="K6" className="cls-2" transform="translate(439.3943 685.2461)">{parseFloat(data.K6)}</text>
          <text className="cls-2" transform="translate(419.5945 721.2461)">K6 - mb</text>
          <rect className="cls-3" x="48.5284" y="834.25" width="108" height="36"/>
          <rect className="cls-3" x="48.5284" y="870.25" width="108" height="36"/>
          <text id="K4" className="cls-2" transform="translate(90.2168 857.29)">{parseFloat(data.K4)}</text>
          <text className="cls-2" transform="translate(64.2613 893.29)">K4 - mb</text>
          <rect className="cls-3" x="940.0022" y="662.2061" width="108" height="36"/>
          <rect className="cls-3" x="940.0022" y="698.2061" width="108" height="36"/>
          <text id="K8" className="cls-2" transform="translate(981.6907 685.2461)">{parseFloat(data.K8)}</text>
          <text className="cls-2" transform="translate(955.7351 721.2461)">K8 - mb</text>
          <rect className="cls-3" x="770.9462" y="210.75" width="108" height="36"/>
          <rect className="cls-3" x="770.9462" y="246.75" width="108" height="36"/>
          <text id="P1" className="cls-2" transform="translate(788.2514 233.79)">{parseFloat(data.P1)}</text>
          <text className="cls-2" transform="translate(786.7988 269.79)">P1 - mb</text>
          <line className="cls-15" x1="670.9582" y1="116.228" x2="670.9462" y2="130.967"/>
          <line className="cls-15" x1="670.9462" y1="166.967" x2="670.9462" y2="255.2061"/>
          <line className="cls-15" x1="670.9462" y1="327.2061" x2="670.9462" y2="436.478"/>
          <line className="cls-16" x1="670.9462" y1="472.478" x2="670.9462" y2="521.7278"/>
          <circle id="V23" className="cls-4" cx="828.0242" cy="184.967" r="18" fill={valveState(data.VE23)}/>
          <text className="cls-5" transform="translate(815.7125 192.011)">23</text>
          <g>
            <circle id="V31" className="cls-4" cx="420.6238" cy="279.832" r="18" fill={valveState(data.VE31)}/>
            <text className="cls-5" transform="translate(408.3123 286.876)">31</text>
          </g>
          <g>
            <circle id="V30" className="cls-4" cx="325.3109" cy="341.7692" r="18" fill={valveState(data.VE30)}/>
            <text className="cls-5" transform="translate(312.9994 348.8132)">30</text>
          </g>
          <g>
            <circle id="V32" className="cls-4" cx="548.6752" cy="341.4447" r="18" fill={valveState(data.VE32)}/>
            <text className="cls-5" transform="translate(536.3637 348.4887)">32</text>
          </g>
          <circle id="V7" className="cls-4" cx="280.6665" cy="168.739" r="18" transform="translate(-81.314 419.981) rotate(-86.8636)" fill={valveState(data.VE7)}/>
          <text className="cls-5" transform="matrix(0.9985, 0.0547, -0.0547, 0.9985, 95.9963, 155.6636)">7</text>
          <circle id="V22" className="cls-4" cx="210.3965" cy="148.967" r="18" fill={valveState(data.VE22)}/>
          <text className="cls-5" transform="translate(198.085 156.011)">22</text>
          <circle id="V33" className="cls-4" cx="908.0022" cy="408.25" r="18" fill={valveState(data.VE33)}/>
          <text className="cls-5" transform="translate(895.6907 415.2939)">33</text>
          <circle id="V13" className="cls-4" cx="295.8848" cy="462.25" r="18" fill={valveState(data.VE13)}/>
          <text className="cls-5" transform="translate(283.5733 469.2939)">13</text>
          <circle id="V14" className="cls-4" cx="354.737" cy="462.25" r="18" fill={valveState(data.VE14)}/>
          <text className="cls-5" transform="translate(342.4254 469.2939)">14</text>
          <circle id="V17" className="cls-4" cx="210.3965" cy="408.25" r="18" fill={valveState(data.VE17)}/>
          <text className="cls-5" transform="translate(198.085 415.2939)">17</text>
          <circle id="V6" className="cls-4" cx="279.6817" cy="613.4998" r="18" transform="translate(-526.3395 839.4243) rotate(-86.8636)" fill={valveState(data.VE6)}/>
          <text className="cls-5" transform="matrix(0.9985, 0.0547, -0.0547, 0.9985, 95.0115, 600.4244)">6</text>
          <circle id="V25" className="cls-4" cx="208.5288" cy="594.9994" r="18" fill={valveState(data.VE25)}/>
          <text className="cls-5" transform="translate(196.2173 602.0434)">25</text>
          <circle id="V26" className="cls-4" cx="560.9867" cy="698.2061" r="18" fill={valveState(data.VE26)}/>
          <text className="cls-5" transform="translate(548.6752 705.25)">26</text>
          <circle id="V12" className="cls-4" cx="354.737" cy="698.2061" r="18" fill={valveState(data.VE12)}/>
          <text className="cls-5" transform="translate(342.4255 705.25)">12</text>
          <circle id="V16" className="cls-4" cx="295.8848" cy="800.4786" r="18" fill={valveState(data.VE16)}/>
          <text className="cls-5" transform="translate(283.5733 807.5225)">16</text>
          <circle id="V27" className="cls-4" cx="399.0095" cy="800.4786" r="18" fill={valveState(data.VE27)}/>
          <text className="cls-5" transform="translate(386.6979 807.5225)">27</text>
          <rect className="cls-3" x="770.9462" y="662.2061" width="108" height="36"/>
          <rect className="cls-3" x="770.9462" y="698.2061" width="108" height="36"/>
          <text id="K3" className="cls-2" transform="translate(806.4789 685.2461)">{parseFloat(data.K3)}</text>
          <text className="cls-2" transform="translate(786.6791 721.2461)">K3 - mb</text>
          <g>
            <rect className="cls-17" x="616.9462" y="606.7061" width="108" height="36"/>
            <text className="cls-2" transform="translate(645.9384 626.7461)"><tspan className="cls-18">F</tspan><tspan x="11.0645" y="0">il</tspan><tspan className="cls-19" x="22.3442" y="0">t</tspan><tspan x="30.144" y="0">er</tspan></text>
          </g>
          <line className="cls-20" x1="670.9462" y1="593.7278" x2="670.9582" y2="606.7061"/>
          <line className="cls-20" x1="670.9582" y1="642.7061" x2="670.9582" y2="782.4786"/>
          <line className="cls-20" x1="770.9462" y1="231.75" x2="670.9582" y2="231.75"/>
          <line className="cls-20" x1="810.0242" y1="184.967" x2="670.9462" y2="184.967"/>
          <circle id="V28" className="cls-4" cx="994.0022" cy="800.4786" r="18" fill={valveState(data.VE28)}/>
          <text className="cls-5" transform="translate(981.6907 807.5225)">28</text>
          <polyline className="cls-21" points="724.946 80.228 994.002 80.228 994.002 662.206"/>
          <line className="cls-21" x1="994.0022" y1="734.2061" x2="994.0022" y2="782.4786"/>
          <polyline className="cls-20" points="578.987 698.206 670.946 698.206 770.946 698.206"/>
          <polyline className="cls-20" points="435.009 870.25 994.002 870.25 994.002 818.479"/>
          <line className="cls-20" x1="670.9582" y1="818.4786" x2="670.9462" y2="870.25"/>
          <polyline className="cls-20" points="417.009 800.479 457.862 800.479 457.862 870.25"/>
          <line className="cls-20" x1="363.0095" y1="870.25" x2="156.5283" y2="870.25"/>
          <polyline className="cls-20" points="381.009 800.479 342.425 800.479 342.425 870.25"/>
          <path className="cls-22" d="M280.6665,854.022" transform="translate(-178.1381 -19.772)"/>
          <line className="cls-20" x1="101.5435" y1="818.4516" x2="101.5435" y2="834.25"/>
          <line className="cls-20" x1="101.5435" y1="611.7008" x2="101.5435" y2="662.2061"/>
          <polyline className="cls-21" points="103.513 130.994 103.513 80.228 616.946 80.228"/>
          <line className="cls-20" x1="210.3965" y1="130.967" x2="210.3965" y2="80.228"/>
          <polyline className="cls-20" points="210.396 166.967 210.396 228.75 101.544 228.75"/>
          <line className="cls-20" x1="192.3965" y1="408.25" x2="103.5132" y2="408.25"/>
          <path className="cls-20" d="M406.5346,428.022" transform="translate(-178.1381 -19.772)"/>
          <line className="cls-20" x1="101.5435" y1="166.9401" x2="102.5284" y2="575.7547"/>
          <line className="cls-20" x1="228.3965" y1="408.25" x2="890.0022" y2="408.25"/>
          <line className="cls-20" x1="926.0022" y1="408.25" x2="994.0022" y2="408.25"/>
          <polyline className="cls-20" points="210.396 488.501 210.396 454.478 101.544 454.478"/>
          <line className="cls-20" x1="501.1497" y1="818.4516" x2="501.1497" y2="870.25"/>
          <line className="cls-20" x1="295.8848" y1="818.4786" x2="295.8848" y2="870.25"/>
          <line className="cls-20" x1="295.8848" y1="782.4786" x2="295.8848" y2="578.4529"/>
          <line className="cls-20" x1="295.8848" y1="444.25" x2="295.8848" y2="408.25"/>
          <line className="cls-20" x1="208.5288" y1="576.9994" x2="208.5288" y2="560.5006"/>
          <polyline className="cls-21"  points="208.529 612.999 208.529 639.706 103.513 639.706 25.317 639.706 25.317 626.353"/>
          <line className="cls-20" x1="354.737" y1="444.25" x2="354.737" y2="408.25"/>
          <polyline className="cls-20" points="354.737 480.25 354.737 636.953 295.885 636.953"/>
          <line className="cls-20" x1="372.737" y1="698.2061" x2="403.8616" y2="698.2061"/>
          <line className="cls-20" x1="336.737" y1="698.2061" x2="295.8848" y2="698.2061"/>
          <line className="cls-20" x1="511.8616" y1="698.2061" x2="542.9867" y2="698.2061"/>
          <polyline className="cls-20" points="503.119 782.506 503.119 758.356 295.885 758.342"/>
          <g>
            <rect className="cls-20" x="399.7249" y="432.2637" width="116.2734" height="124.023" rx="12" ry="12"/>
            <text id="MixPct" className="cls-2" transform="translate(429.2579 477.1446)">{parseFloat(data['P\/T']).toFixed(2)}</text>
            <text id="DumpTemp" className="cls-2" transform="translate(430.4136 521.5141)">{parseFloat(data['PT 100 Bidon C'])}</text>
            <text className="cls-2" transform="translate(482.2212 477.145)">%</text>
            <text className="cls-2" transform="translate(478.7652 521.5141)">C</text>
          </g>
          <g>
            <polyline points="12.528 585.028 38.255 585.028 12.528 628.384 38.255 628.384"/>
            <line className="cls-23" x1="38.2548" y1="606.7061" x2="25.3173" y2="606.7061"/>
            <line className="cls-23" x1="38.2548" y1="595.6451" x2="38.2548" y2="618.6451"/>
          </g>
          <g>
            <polyline points="444.998 567.836 470.725 567.836 444.998 611.192 470.725 611.192"/>
            <line className="cls-23" x1="470.7253" y1="589.5139" x2="457.7878" y2="589.5139"/>
            <line className="cls-23" x1="470.7253" y1="578.4529" x2="470.7253" y2="601.4529"/>
          </g>
          <g>
            <polyline className="cls-23" points="513.984 623.434 513.984 648.478 488.256 635.956"/>
            <polyline className="cls-23" points="488.256 623.434 488.256 635.956 488.256 648.478"/>
          </g>
          <line className="cls-24" x1="457.7878" y1="567.8359" x2="457.7878" y2="556.2867"/>
          <line className="cls-24" x1="457.8619" y1="609.7061" x2="457.7878" y2="662.2061"/>
          <line className="cls-24" x1="457.8619" y1="635.9561" x2="488.2565" y2="635.9561"/>
          <g>
            <polyline points="560.987 567.836 586.714 567.836 560.987 611.192 586.714 611.192"/>
            <line className="cls-23" x1="586.714" y1="589.5139" x2="573.7765" y2="589.5139"/>
            <line className="cls-23" x1="586.714" y1="578.4529" x2="586.714" y2="601.4529"/>
          </g>
          <g>
            <rect className="cls-25" x="902.6108" y="498.1227" width="46.783" height="46.783"/>
            <circle className="cls-26" cx="926.0022" cy="521.5141" r="23.3915"/>
            <text className="cls-2" transform="translate(918.6582 528.5582)">A</text>
          </g>
          <g>
            <rect className="cls-25" x="550.4589" y="498.1227" width="46.783" height="46.783"/>
            <circle className="cls-26" cx="573.8504" cy="521.5141" r="23.3915"/>
            <text className="cls-2" transform="translate(566.5063 528.5582)">A</text>
          </g>
          <polyline className="cls-21" points="513.984 635.956 573.777 635.956 573.777 609.706"/>
          <line className="cls-21" x1="573.7765" y1="567.8359" x2="573.8504" y2="544.9056"/>
          <line className="cls-21" x1="949.3937" y1="521.5141" x2="994.0022" y2="521.7278"/>
          <g>
            <rect className="cls-25" x="2" y="522.1091" width="46.783" height="46.783"/>
            <circle className="cls-26" cx="25.3915" cy="545.5006" r="23.3915"/>
            <text className="cls-2" transform="translate(18.8873 552.5446)">B</text>
          </g>
          <line className="cls-24" x1="25.3915" y1="568.8921" x2="25.3173" y2="585.028"/>
          <g>
            <rect className="cls-25" x="254.4934" y="247.9893" width="46.783" height="46.783"/>
            <circle className="cls-26" cx="277.8848" cy="271.3807" r="23.3915"/>
            <text className="cls-2" transform="translate(271.3806 278.4248)">B</text>
          </g>
          <g>
            <rect className="cls-17" x="48.0359" y="740.3423" width="108" height="36"/>
            <text className="cls-2" transform="translate(80.136 760.3814)"><tspan className="cls-27">T</tspan><tspan className="cls-28" x="10.8477" y="0">r</tspan><tspan x="18.5762" y="0">ap</tspan></text>
          </g>
          <line className="cls-24" x1="103.5132" y1="782.5055" x2="103.5132" y2="776.3423"/>
          <line className="cls-24" x1="103.5132" y1="740.3423" x2="103.5132" y2="734.2061"/>
          <g>
            <polyline points="754.32 354.308 754.32 328.581 797.676 354.308 797.676 328.581"/>
            <line className="cls-23" x1="775.9982" y1="328.5811" x2="775.9982" y2="341.5186"/>
            <line className="cls-23" x1="764.9372" y1="328.5811" x2="787.9372" y2="328.5811"/>
          </g>
          <line className="cls-29" x1="754.3202" y1="341.1202" x2="566.6752" y2="341.7692"/>
          <line className="cls-30" x1="420.6119" y1="182.2194" x2="420.6238" y2="127.289"/>
          <line className="cls-30" x1="367.8848" y1="140.1527" x2="420.6119" y2="140.1527"/>
          <line className="cls-30" x1="420.6119" y1="254.2194" x2="420.6238" y2="261.832"/>
          <line className="cls-30" x1="420.6238" y1="297.832" x2="420.6119" y2="305.4447"/>
          <line className="cls-30" x1="474.6119" y1="341.4447" x2="530.6752" y2="341.4447"/>
          <line className="cls-30" x1="366.6119" y1="341.4447" x2="343.3109" y2="341.7692"/>
          <line className="cls-30" x1="307.3109" y1="341.7692" x2="251.1346" y2="341.4447"/>
          <line className="cls-30" x1="277.8848" y1="294.7722" x2="277.8845" y2="341.1202"/>
          <line className="cls-24" x1="846.0242" y1="184.967" x2="994.0022" y2="184.967"/>
          <line className="cls-20" x1="829.009" y1="436.505" x2="829.009" y2="408.25"/>
          <polyline className="cls-20" points="827.039 472.451 827.039 506.501 670.946 506.501"/>
          <g>
            <polyline points="283.65 527.781 308.119 527.781 283.65 578.675 308.119 578.675"/>
            <line className="cls-23" x1="283.6505" y1="527.7805" x2="283.6505" y2="578.6755"/>
            <line className="cls-23" x1="307.2288" y1="527.7805" x2="307.2288" y2="578.6755"/>
          </g>
          <line className="cls-24" x1="295.8848" y1="480.25" x2="295.8848" y2="528.5582"/>
          <text className="cls-31" transform="translate(800.1848 350.5332)">V<tspan className="cls-32" x="13.0078" y="0">m18</tspan></text>
          <text className="cls-31" transform="translate(388.1854 593.7273)">V<tspan className="cls-32" x="13.0078" y="0">m11</tspan></text>
          <g>
            <circle id="V37" className="cls-4" cx="566.6752" cy="161.1527" r="18" fill={valveState(data.VE37)}/>
            <text className="cls-5" transform="translate(554.3637 168.1966)">37</text>
          </g>
          <line className="cls-30" x1="566.6752" y1="143.1527" x2="566.6752" y2="127.289"/>
          <g>
            <text id="TSpeed" className="cls-2" transform="translate(555.9107 298.8042)">{parseFloat(data['Pumping turbo speed'])}</text>
            <text className="cls-2" transform="translate(607.4423 298.8046)">%</text>
          </g>
          {/* <image width="568" height="929" transform="translate(1077.3846)" href="fridgepic.png"/>
          <g>
            <rect className="cls-33" x="1100.8619" y="179.989" width="118" height="30.261" rx="12" ry="12"/>
            <text id="T1st" className="cls-2" transform="translate(1124.2204 205.0331)">77.7</text>
          </g>
          <g>
            <rect className="cls-33" x="1100.8619" y="271.0477" width="118" height="30.261" rx="12" ry="12"/>
            <text id="T2nd" className="cls-2" transform="translate(1130.3757 296.0917)">4.4</text>
          </g>
          <g>
            <rect className="cls-33" x="1100.8619" y="403.272" width="118" height="30.261" rx="12" ry="12"/>
            <text id="Tstill" className="cls-2" transform="translate(1115.7038 428.316)">900</text>
          </g>
          <g>
            <rect className="cls-33" x="1100.8619" y="478.1415" width="118" height="30.261" rx="12" ry="12"/>
            <text id="TCP" className="cls-2" transform="translate(1115.86 503.1855)">88</text>
          </g>
          <g>
            <rect className="cls-33" x="1100.8619" y="542.7971" width="118" height="30.261" rx="12" ry="12"/>
            <text id="TMC" className="cls-2" transform="translate(1115.86 567.8412)">13</text>
          </g> */}
        </svg>
      </div>
    </div>
  </div>
    
    return (
      svgObject
    );
  }