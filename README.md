# Cloud Nine marketplace

<img width="800" alt="image" src="https://github.com/jerrendang/commerce/assets/16262549/cc76fa70-3f0e-4f65-9983-ffa59e4deb87">

#### Ecommerce site for buying and selling of clothes.

## Features

#### User

 - Users log into their saved profile.
 - Session data persists for 3600 seconds.
 - User email is verified upon sign up.
 - User notified when their item is sold.

#### Item/Listing

 - Listings are created by user and may be edited/removed.
 - Listings can be added to cart for checkout. 

#### Checkout/Payment

 - Items added to cart are to be checked out.
 - App sends price/checkout info to Stripe to be proccessed.
 - Checkout session hosted completely by Stripe. No payment/sensitive information to be stored in Cloud Nine database.

## Implementation

 - Frontend: React and Redux/Redux-thunk for state management.
 - Backend: Node/Express
 - Database: PostgreSQL, AWS S3 Bucket (future hopes of also implementing the use of MongoDB for an extra NoSQL DB)
 
## Database

#### Stack
 - PostgreSQL, AWS S3
 - Future plans of implementing MongoDB.
#### Tables
 - User, Item, Notification, Order
#### Relations
 - User has many Notifications,
 - User has many Orders,
 - User has many Items

## Images
<img width="800" alt="image" src="https://github.com/jerrendang/commerce/assets/16262549/2a38dcb6-5071-4abf-bd5f-7d1194c18cc7">

##

<img width="800" alt="image" src="https://github.com/jerrendang/commerce/assets/16262549/260c19a6-cb65-4681-840b-2e00638a531c">

##

<img width="800" alt="image" src="https://github.com/jerrendang/commerce/assets/16262549/61126cea-201e-48e5-8fd2-dd3561eb9955">

##

<img width="800" alt="image" src="https://github.com/jerrendang/commerce/assets/16262549/f7380364-adb1-4d44-8e9f-c6be8c133863">

