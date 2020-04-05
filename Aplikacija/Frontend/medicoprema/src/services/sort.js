export function sortOrdersByDate(orders, ascending = true) {
    if(orders != null){
      let len = orders.length;
      for (let i = len-1; i>=0; i--){
       for(let j = 1; j<=i; j++){
        let condition = ascending ? 
          orders[j-1].Order.Date > orders[j].Order.Date : 
          orders[j-1].Order.Date < orders[j].Order.Date;
  
         if(condition){
              let temp = orders[j-1];
              orders[j-1] = orders[j];
              orders[j] = temp;
          }
       }
     }
    } 
     return orders;
  }
  
  export function sortReuquestByDate(requests, ascending = true) {
    let len = requests.length;
      for (let i = len-1; i>=0; i--){
       for(let j = 1; j<=i; j++){
         let condition = ascending ? requests[j-1].Date > requests[j].Date : requests[j-1].Date < requests[j].Date;
         if(condition){
              let temp = requests[j-1];
              requests[j-1] = requests[j];
              requests[j] = temp;
          }
       }
     }
     return requests;
  }