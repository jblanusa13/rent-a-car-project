Vue.component("user-profile", {
  data: function () {
    return {
		userId:null
    }
  },
  template: `
    <div>
      {{ title }}
      <form>
        <button type="submit" v-on:click="editUser"></button>
      </form>
    </div>
  `,
  mounted() {
	 this.userId = this.$route.params.id;
  },
  methods: {
    editUser: function () {
      event.preventDefault();
    }
  }
  
});
