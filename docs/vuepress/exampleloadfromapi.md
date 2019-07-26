# Load data from external API

This example shows how to fetch data from external api and insert into VuePress page.

### Sample JSON payload

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  .../*Truncated for brevity*/
]
```

### Sample HTML Code

```html
<table>
  <thead>
    <tr>
      <th>User</th>
      <th style="text-align: center;">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="i in items">
      <td>{{i.name}}</td>
      <td style="text-align: center;">{{i.email}}</td>
    </tr>
  </tbody>
</table>
```

This is the sample HTML script to be inserted into your .md file.

### Sample JavaScript Code

```js
const axios = require("axios");
export default {
  data() {
    return {
      items: []
    };
  },
  beforeMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        console.log(res);
        this.$data.items = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
```

This is a sample script to be inserted at the end of your .md file.

### Sample Rendered Output

<table>
  <thead>
    <tr>
      <th>User</th>
      <th style="text-align: center;">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="i in items">
      <td>{{i.name}}</td>
      <td style="text-align: center;">{{i.email}}</td>
    </tr>
  </tbody>
</table>

<script>
const axios = require('axios')
export default {
    data() {
        return {
            items: []
        }
    },
    beforeMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            console.log(res);
            this.$data.items = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    }
}
</script>
