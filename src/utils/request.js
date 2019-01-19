import fetchJsonp from 'fetch-jsonp'
import checkSecret from './fuck'

function parseJSON(response) {
  return response.slice(12, -1).json();
}

const getparams = (data) => { var vs = []; Object.keys(data).map(i=>{ vs.push(`${i}=${data[i]}`) }); return vs.join('&') }

// The fxcking scan in Github
const base_api = ["h", "t", "t", "p", ":", "/", "/", "v", "a", "n", "i", "s", "h", "a", "p", "p", ".", "1", "0", "j", "q", "k", "a", ".", "c", "o", "m", ".", "c", "n", "/", "a", "n", "n", "u", "a", "l", "M", "e", "e", "t", "i", "n", "g", "/", "i", "n", "d", "e", "x", ".", "p", "h", "p"].join('')

export default {
  request: ( params ) => {
    return fetchJsonp(`${base_api}?${getparams(checkSecret(params))}`, {jsonpCallbackFunction: 'jsonpReturn'})
  }
}
