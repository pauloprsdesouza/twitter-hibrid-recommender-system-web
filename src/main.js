// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;

Vue.use(VueResource)

Vue.prototype.$APIUri = function (path) {
  //return 'http://nbcgib.uesc.br/rectwitter' + path;
  // return 'http://localhost:8080' + path;
  return 'https://www.experimentalapp.com.br:8081/twitter-app' + path;
}

Vue.http.interceptors.push((request, response) => {
  var token;

  token = localStorage.getItem("token");

  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization', 'Bearer ' + token);

  response((response) => {
    if (response.status === 401) {
      window.location.href = '/unauthorized';
      localStorage.removeItem("token");
    }

    if (response.status === 500) {
      window.location.href = '/internal-error';
    }
  });
});

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
