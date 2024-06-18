<template>
	<div id="swipelux-container">
		
	</div>
</template>

<script>


export default {
	name: 'App',
	components: {
		
	},

	data : function(){
		return {
			sdk : null
		}
	},

	computed : {
	},

	mounted : function(){

		/// required		

		this.sdk = new window.BastyonSdk()

		this.sdk.init().then(() => {
			
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

		const defaultValues = {
			targetAddress: {
				value: "",
				editable: true,
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
			availableReceiveCurrency: "PKOIN",
			defaultValues
		};

		

		const widget = new window.SwipeluxWidget(swipeluxContainer, settings);
		widget.init();

	},

	methods : {
	}
}
</script>

<style>

</style>
