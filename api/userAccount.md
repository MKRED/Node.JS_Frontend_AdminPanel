#### /register
```json
{ 
	nick: String,
	email: String
}
```
```json
{ status: "ok", msg: 'check your email for continue registration' }
```

#### /loginByPass
```json
{ 
	email: String,
	pass: String
}
```
```json
{ status: "ok", msg: 'success login', id: UserId, nick: String, jwt: String, level: String }
```

#### /loginByJwt
```json
{
	id: UserId,
	jwt: String
}
```
```json
{ status: "ok", msg: 'success login', nick: String, level:getUser[0].level }
```

#### /resetPass
```json
{
	email: String
}
```
```json
{ status: "ok", msg: 'new password sent to your email' }
```

#### /changePass
```json
{
	id: UserId,
	oldPass: String,
	newPass: String
}
```
```json
{ status: "ok", msg: 'success password change', jwt }
```

#### /loginViaGoogle
```json
{
	id_token: String
}
```
```json
{ status: "ok", msg: 'success login', id: UserId, nick: String, jwt: String, level:getUser[0].level }
```
#### /loginViaFacebook
```json
{
	id_token: String
}
```
```json
{ status: "ok", msg: 'success login', id: UserId, nick: String, jwt: String, level:getUser[0].level }
```

#### /logOut
```json
{
	...Auth
}
```
```json
{ status: "ok", msg : 'logged out' }
```

#### /deleteAccount
```json
{
	...Auth,
	moneyReturnAccount: String,
	reason: String
}
```
```json
{ status: "ok" }
```
