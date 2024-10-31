import './style.css'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken =
  'pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA'

// 创建地图实例
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  projection: 'globe',
  center: [114.24, 30.59],
  zoom: 4,
})
const select = document.querySelector('#select')
select.addEventListener('change', function () {
  map.setStyle('mapbox://styles/mapbox/' + this.value)
})
