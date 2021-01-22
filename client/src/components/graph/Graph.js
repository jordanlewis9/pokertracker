import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import axios from 'axios';
import NeedAccount from '../utils/NeedAccount';

const Graph = (props) => {
  const { id } = props.user;
  const [sessions, setSessions] = useState(null);
  const [accumProfits, setAccumProfits] = useState(null);
  const [profitForBuffer, setProfitForBuffer] = useState(null);
  const [graphMade, setGraphMade] = useState(false);
  
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/allSessions?u_id=${id}`);
        setSessions(response.data);
      } catch(err) {
        console.log(err)
      }
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);
  
  if (sessions && !accumProfits) {
    let accumArray = [{ session: 0, profit: 0}, { session: 1, profit: sessions[0].profit}];
    for(let i = 1; i < sessions.length; i++){
      accumArray.push({ session: i + 1, profit: sessions[i].profit + accumArray[i].profit });
    }
    setAccumProfits(accumArray);
  }

  if (accumProfits && !profitForBuffer) {
    let avgProfit = accumProfits[accumProfits.length - 1].profit / (accumProfits.length - 1);
    setProfitForBuffer(avgProfit);
  }

  if (sessions && accumProfits && profitForBuffer && !graphMade){
    console.log(accumProfits);
    console.log(profitForBuffer);
    console.log('called');
    const h = window.innerHeight - (window.innerHeight * 0.2);
    const w = window.innerWidth - (window.innerWidth * 0.05);
    const padding = 40;

    const yScale = d3.scaleLinear()
    .domain([d3.min(accumProfits, (d) => d.profit) - profitForBuffer, d3.max(accumProfits, (d) => d.profit) + profitForBuffer])
    .range([h - padding, padding])

const xScale = d3.scaleLinear()
  .domain([0, accumProfits.length - 1])
  .range([padding, w - padding])

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

    const line = d3.line()
                    .x(d => xScale(d.session))
                    .y(d => yScale(d.profit))

    const svg = d3.select('.graph__board')
    .append('svg')
    // .attr('width', w)
    // .attr('height', h)
    .attr('viewBox', `0 0 ${w} ${h}`)
    .style('background', 'lightsteelblue');

    svg.append("g")
        .attr("transform", `translate(0, ${h - padding})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis);

        console.log(line);

    svg.append("path")
        .datum(accumProfits)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "1.5")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);


    setGraphMade(true);
  }

  return (
    <div className="graph__board">
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth }
}

export default connect(mapStateToProps)(Graph);