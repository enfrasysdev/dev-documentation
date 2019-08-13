# Home

<p align="center">
  <img width="300" src="/images/undraw_upload.svg" alt="logo">
</p>

Welcome to Development Team Documentation, this site contains a collection of topics and fields that the development team has involved in or is currently actively developing.

::: tip NOTE
Official GitHub repo link: [https://github.com/enfrasysdev/dev-documentation](https://github.com/enfrasysdev/dev-documentation)
:::

## Contributors

<table>
  <thead>
    <tr>
      <th>User</th>
      <th style="text-align: center;">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="i in items">
      <td>
        <img :src="i.avatar_url" height="48" width="48" />
      </td>
      <td>{{i.login}}</td>
    </tr>
  </tbody>
</table>

<!-- Scripts below this line -->

<script>
const axios = require('axios')
export default {
  data () {
      return {
          items: []
      }
  },
  beforeMount(){
        axios.get('https://api.github.com/repos/enfrasysdev/dev-documentation/contributors?access_token=d24cc72aa03ff5227557300f04acb62df6b022e3')
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
