const useData = (data:any, error:any, loading: any) => {

    function getData(ticker:string, date:string, type:string) {
      if (data) {
        return Number(Number(data[ticker][date][type]).toFixed(2))
      } else {
        return null
      }
    }
    
    return {getData}
}

export default useData