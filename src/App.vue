<template>

	<div>

		<div class="selectAddress">
		</div>

		<div id="swipelux-container" v-show="address">
		
		</div>

	</div>
</template>

<script>


export default {
	name: 'App',
	components: {
		
	},

	data : function(){
		return {
			sdk : null,
			loaded : false,
			address : ''
		}
	},

	computed : {
	},

	mounted : function(){

		/// required		

		this.sdk = new window.BastyonSdk()

		this.sdk.init().then(() => {
			this.loaded = true

			this.sdk.get.account().then(({address}) => {
				

				console.log("ADDRESS", address)

				this.address = address

				const defaultValues = {
					targetAddress: {
						value: this.address,
						editable: false,
					},
					phone: {
						value: "",
						editable: true,
					},
					email: {
						value: "",
						editable: true,
					}
				};


				const swipeluxContainer = document.getElementById("swipelux-container");

				const settings = {
					apiKey: '44939abf-670f-4e32-843a-e7cb92868dbf',
					//availableReceiveCurrency: "PKOIN",
					defaultValues
				};

				const widget = new window.SwipeluxWidget(swipeluxContainer, settings, (e) => {
					console.log("event", e)
				});


				widget.init();

			})
		})

		this.sdk.emit('loaded')

		this.sdk.on('changestate', (data) => {
			this.$router.push(this.sdk.getroute(data))
		})

		this.sdk.on('action', () => {
		})

		this.sdk.on('balance', () => {
		})

		this.sdk.on('state', () => {
		})

		this.sdk.on('keyboard', () => {
		})

		this.sdk.get.appinfo().then(() => {
		})

		

	},

	methods : {
	}
}
</script>

<style>

#swipelux-container{
	max-width : 400px;
	margin : 0 auto;
	margin-top: 66px;
}
	
</style>
