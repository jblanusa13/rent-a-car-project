Vue.component("user-profile", {
  data: function () {
    return {
		userId:null
    }
  },
  template: `
    <div>
      <p>You're logged in! :)</p>
      <form>
        <button type="submit" v-on:click="editUser">Update user info</button>
      </form>
    </div>
  `,
  mounted() {
	  this.userId =this.$route.params.id
	  console.log(this.userId)
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push({ path: `/userProfileUpdate/${this.userId}` });
    }
  }
  
});
