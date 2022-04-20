#### Storyboard pages 8, 9, 10, 11, 12, 13, 27
#### /admin/getUsersList
```json
{ 
	...Auth
	status: String,
	search: String,
	levels: ["superAdmin", "begginer", ...],
	merchant: Boolean
}
```
```json
{status: 'ok', users: [
	{
		id: 1,
		country: String,
		created: "2022-02-22T12:41:55.000Z",
		credit: Number,
		deletedTime: "2022-02-22T12:41:55.000Z",
		email: "inogrowserver@gmail.com",
		level: "begginer",
		nick: "inogrow server",
		phone: String,
		suspendedTime: "2022-02-22T12:41:55.000Z",
		firstName: String,
		surName: String,
		adress1: String,
		adress2: String,
		postalCode: String,
		city: String,
		stateRegion: String,
		compantName: String,
		merchant: String,
		downloads: String,
		uploads: String
	},
	...
]}
```
#### Storyboard pages 14, 15
#### /getPolicy
```json
{ 
    country: String,
}
```
```json
{status: 'ok', policy: {
		country: String,
		policy: String
	}
}
```
#### Storyboard pages 14, 15
#### /admin/setPolicy
```json
{ 
	...Auth
    country: String,
    policy: String
}
```
```json
	{ status: "ok", msg: "policy updated" };
```

#### Storyboard page 18
#### ./admin/getAllCreditProducts
```json
{
	...Auth
}
```
```json
{status: 'ok',
	products: [
		{
			id: 1,
			bonus: 5,
			cost: 100,
			name: "standart",
			recharge: 100
		},
		...
	]
}
```
#### Storyboard page 18
#### /admin/setCreditProduct
```json
{ 
	...Auth
	"name": "standart",
	"cost": 100,
	"recharge": 100,
	"bonus": 5
}
```
```json
	{ status: "ok", msg: "credit product updated" };
```
#### Storyboard pages 19, 20, 30, 31, 32, 33
#### //admin/getTransactions
```json
{ 
	...Auth
	"code": Number		//transaction.id
	name: String,		//User Nickname
	dateFrom: Date,
	dateTo: Date,
	description: String,
	status: String
	"products": ["standart", ...],
}
```
```json
{status: 'ok', transaction: [
	{
		id: 13,
		amount: 10,
		netAmount: 10,
		created: "2022-03-04T07:49:40.000Z",
		externalId: "12109541L3456550C",
		hoarding: 10,
		nick: "Raidan",
		productName: "standart"
	},
	...
]}
```
#### Storyboard page 25
#### /admin/giftCredit
```json
{ 
	...Auth
	code: Number		//users.id
	amount: Number
}
```
```json
{ status: "ok", msg: "gift credit added" }
```
#### Storyboard pages 27
#### /admin/removeMerchantRight
```json
{ 
	/admin/removeMerchantRight
	code: Number // user id
}
```
```json
{ status: "ok", msg: "merchant right removed" }
```

#### Storyboard pages 30, 31, 32, 33
#### /admin/approvePayOut
```json
{ 
	...Auth
	code: Number // transaction id
}
```
```json
{ status: "ok", msg: "payout sent" }
```

#### Storyboard pages 30, 31, 32, 33
#### /admin/cancelPayOut
```json
{ 
	...Auth
	code: Number // transaction id
}
```
```json
{ status: "ok", msg: "payout canceled" }
```

#### Storyboard pages 35, 42, 43, 44, 49, 56, 58 
#### /admin/getPatternsList
```json
{ 
	...Auth
	status: String,
	region: String,
	make: String,
	year: String,
	model: String,
	submodel: String,
	series: String,
	nick: String,
	priceFrom: Number,
	priceTo : Number,
	earningSumFrom : Number,
	earningSumTo : Number,
	sizeFrom: Number,
	sizeTo: Number,
	dateFrom: Date,
	dateTo: Date,
	sponsor: Boolean
}
```
```json
{status: 'ok', pats: [
	{
		downloads: 10
		id: 11
		make: "BMW"
		model: "X sries"
		nick: "Raidan"
		part: "Bumper"
		price: 4
		region: "USA"
		series: null
		side: "Out Front"
		size: 100
		subPart: "Bikini/Wrapped/Senosrs"
		submodel: "X 5"
		updated: "2022-03-24T15:51:14.000Z"
		year: "2020",
		//sponsorAd info
		profit: Number,
		credit: Number,
		paypal: Number,
		start: Date,
		en: Dated
	},
	...
]}
```

#### Storyboard pages 37, 39, 40, 41, 43, 45, 46, 47, 48, 50
#### /admin/patternSetStatus
```json
{ 
	...Auth
	code: Number, // pattern id
	status: String // pattern id
}
```
```json
{ status: "ok", msg: "staus updated" }
```

#### Storyboard pages 51, 52, 53, 54, 55
#### /admin/getCarModelColumn
```json
{ 
	...Auth
	column: String // column name in DB
}
```
```json
{ status: "ok", models: [
	{ columnName: String },
	{ columnName: String }
]}
```


#### Storyboard pages 59
#### /admin/getSponsorAdPrice
```json
{ 
	...Auth
}
```
```json
res.json({ status: "ok", price: Number });
```

#### Storyboard pages 59
#### /admin/setSponsorAdPrice
```json
{ 
	...Auth,
	price: Number
}
```
```json
res.json({ status: "ok", msg: "price updated" });
```
#### Storyboard pages 61
#### /admin/getUltrafitList
```json
{ 
	...Auth,
	Search: Number OR String
}
```
```json
res.json({ status: "ok", ult: [
	id: 2
	name: "ULTRAFIT XP CRYSTAL"
	category: "Paint protection film"
	exposure: 0
	inventory: 10
	price: 100
]});
```
#### Storyboard pages 62
#### /admin/getUltrafitCategoryList
```json
{ 
	...Auth,
	dept: Number
}
```
```json
res.json({ status: "ok", category: [
	id: 1
	dept: "1"
	name: "Paint protection film"
]});
```
#### Storyboard pages 86
#### /admin/adminsList
```json
{ 
	...Auth
}
```
```json
{ status: "ok", admins: [{id, level, email, lastAccess}, ...] };
```

#### Storyboard pages 87, 88
#### /admin/createAdmin
```json
{ 
	...Auth
	email: String,
	pass: String
}
```
```json
{ status: "ok", msg: "admin created" }
```
#### Storyboard pages 86
#### /admin/deleteAdmin
```json
{ 
	...Auth
	code: Number // user id
}
```
```json
{ status: "ok", msg: "userDeleted" }
```
