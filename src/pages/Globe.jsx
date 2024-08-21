import * as d3 from 'd3';
import { useEffect } from 'react';
import data from '../constants/world.json';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Globe = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const height = Math.min(window.innerWidth - 50, window.innerHeight - 100);
    const width = height;
    const dpr = window.devicePixelRatio ?? 1;
    const sensitivity = 75;

    const countryClasses = 'fill-gray-400 stroke-white dark:fill-slate-600';

    const projection = d3
      .geoOrthographic()
      .fitSize([width, height], { type: 'Sphere' });
    const path = d3.geoPath(projection);
    const initialScale = projection.scale();

    const svg = d3
      .select('#globe')
      .attr('width', dpr * width)
      .attr('height', dpr * height)
      .style('width', `${width}px`);

    svg.selectAll('circle').remove();

    const globe = svg
      .append('circle')
      .attr('id', 'map')
      .attr('class', 'fill-white stroke-black dark:fill-slate-900')
      .attr('stroke-width', 1)
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .lower();

    svg
      .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('d', path)
      .attr('class', countryClasses)
      .attr('data-country', (d) => d.id)
      .on('mouseenter', (e) => {
        e.target.classList = 'fill-red-500 dark:fill-red-900';
      })
      .on('mouseleave', (e) => {
        e.target.classList = countryClasses;
      })
      .on('click', (event) => {
        event.preventDefault();
        navigate(`/?country=${event.target.dataset.country}`);
      });

    svg
      .call(
        d3.drag().on('drag', (event) => {
          const rotate = projection.rotate();
          const k = sensitivity / projection.scale();
          projection.rotate([
            rotate[0] + event.dx * k,
            rotate[1] - event.dy * k
          ]);
          const newPath = d3.geoPath().projection(projection);
          svg.selectAll('path').attr('d', newPath);
        })
      )
      .call(
        d3.zoom().on('zoom', (event) => {
          if (event.transform.k > 0.3) {
            projection.scale(initialScale * event.transform.k);
            const newPath = d3.geoPath().projection(projection);
            svg.selectAll('path').attr('d', newPath);
            globe.attr('r', projection.scale());
          } else {
            event.transform.k = 0.3;
          }
        })
      );
  }, [navigate]);

  return (
    <div className='flex-1 flex justify-center items-center'>
      <Helmet>
        <title>What country is that?</title>
        <meta name='title' content='What country is that?' />
        <meta
          name='description'
          content='Find info about the country you see on the map'
        />
      </Helmet>
      <svg id='globe' />
    </div>
  );
};
export default Globe;
