<template>

	<div>

		<div id="swipelux-container" v-show="address">
		
		</div>

		<div id="selectAddress" v-show="!address">
			<div class="contentSelectAddress">
				<div class="content-title">
					Receiver address required
				</div>
				<div class="label-address">
					Please, enter the address of Bastyon account
				</div>
				<form @submit.prevent="validateAddedAddress">
					<div class="input-wrapper">
						<input 
						type="text" 
						class="input-address"
						v-model="addedAddress"
						@input="changeAddedAddress"
						@blur="validateAddedAddress"
						/>
						<div class="notvalidaddress" v-if="!valid">
							This address is not valid
						</div>
					</div>
					<div class="button-wrapper">
						<button
							class="button-address"
							@click="validateAndConnect"
						>
							Continue
						</button>
					</div>
				</form>


			</div>

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
			address : '',
			addedAddress : '',
			valid: true
		}
	},

	computed : {
	},

	mounted : function(){

		/// required	

		this.sdk = new window.BastyonSdk()

		console.log('this.sdk', this.sdk);


		this.sdk.init().then(() => {

			console.log('inited?', this.address);
			this.loaded = true

			this.sdk.get.account().then(({address}) => {

				console.log('gotten address', address);

				this.address = address
				
				this.connectAccount();	

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

		changeAddedAddress(){

			if (!this.valid) this.valid = true;
		},

		validateAddedAddress(){

			try{
				new window.bitcoin.address.fromBase58Check(this.addedAddress || '')
				this.valid = true;
			}

			catch (e){
				this.valid = false;
			}

			return this.valid;

		},

		connectAccount(){

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
				apiKey: '279cbe96-9d1f-4bcd-9ee1-c6d668629af5',
				// availableReceiveCurrency: "PKOIN",
				defaultValues
			};

			const widget = new window.SwipeluxWidget(swipeluxContainer, settings, (e) => {
				console.log("event", e)
			});

			console.log('init!!!!!');

			widget.init();



		},

		validateAndConnect(){

			let valid = this.validateAddedAddress();

			if (valid){

				this.address = this.addedAddress;

				this.connectAccount();
			}

		}
	}
}
</script>

<style>

body{
	background: #F5F5F5;
}


#swipelux-container{
	max-width : 400px;
	margin : 0 auto;
	margin-top: calc(var(--app-margin-top) + 66px);
	border-radius: 24px;
	-webkit-box-shadow: 0 1.2px 40px rgba(189, 191, 194, 0.2);
    box-shadow: 0 1.2px 40px rgba(189, 191, 194, 0.2);
}

#selectAddress{
	max-width : 400px;
	margin : 0 auto;
	margin-top: calc(var(--app-margin-top) + 66px);
	border-radius: 24px;
	-webkit-box-shadow: 0 1.2px 40px rgba(189, 191, 194, 0.2);
    box-shadow: 0 1.2px 40px rgba(189, 191, 194, 0.2);
}

.contentSelectAddress{
	position: relative;
	max-width: 400px;
	padding: 2em 1.5em 3em 1.5em;
}

.content-title{
	padding-bottom: 4em;
	font-weight: 800;
	font-size: 20px;
}

.label-address{
	font-size: .9em;
}

.input-wrapper{
	margin-top: 1.5em;
    vertical-align: middle;
	max-width : 400px;
	min-height: 80px;
}

.input-address{
	box-sizing: border-box;
	width: 100%;
	background: rgb(var(--background-hidden-layer));
	color: rgb(var(--text-color));
	border-radius: 6px;
	padding: 0 0.5em;
	border: 1px solid rgb(var(--neutral-grad-2));
	min-height: 44px;
	outline:none;
}

.notvalidaddress{
	margin-top: 0.5em;
	font-size: .9em;
	/* text-align: center; */
	color: rgb(var(--color-bad));
}


.button-wrapper{
	margin-top: 3em;
	max-width: 400px;
    vertical-align: middle;
}

.button-address{
	width: 100%;
	height: 37px;
	line-height: 35px;
	padding: 0;
	background: rgb(var(--color-bg-ac-bright));
	color: rgb(var(--text-on-bg-ac-color));
	border: 1px solid rgb(var(--color-bg-ac-bright));
	text-align: center;
	border-radius: 8px;
	font-size: 0.9em;
	transition: 0.3s;
}


	
</style>
