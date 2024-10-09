import request from './request'

const getReportData = () => request.get('/reportdata')
const getSaleData = () => request.get('/saledata')
const getKeyWordsData = () => request.get('/keyworddata')
const getCategoryData = () => request.get('/categorydata')
const getMapData = () => request.get('/mapdata')

export { getReportData, getSaleData, getKeyWordsData, getCategoryData, getMapData }
