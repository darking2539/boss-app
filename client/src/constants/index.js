// Login Page
export const APP_INIT = "APP_INIT";


// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Stock Page
export const HTTP_STOCK_FETCHING = "HTTP_STOCK_FETCHING";
export const HTTP_STOCK_SUCCESS = "HTTP_STOCK_SUCCESS";
export const HTTP_STOCK_FAILED = "HTTP_STOCK_FAILED";

// Stock Edit Page
export const HTTP_STOCK_EDIT_FETCHING = "HTTP_STOCK_EDIT_FETCHING";
export const HTTP_STOCK_EDIT_SUCCESS = "HTTP_STOCK_EDIT_SUCCESS";
export const HTTP_STOCK_EDIT_FAILED = "HTTP_STOCK_EDIT_FAILED";
export const HTTP_STOCK_EDIT_INITIALED = "HTTP_STOCK_EDIT_INITIALED";

// Showdevice Page
export const HTTP_SHOW_DEVICE_FETCHING = "HTTP_SHOW_DEVICE_FETCHING";
export const HTTP_SHOW_DEVICE_SUCCESS = "HTTP_SHOW_DEVICE_SUCCESS";
export const HTTP_SHOW_DEVICE_FAILED = "HTTP_SHOW_DEVICE_FAILED";

// NOTE Page
export const HTTP_NOTE_FETCHING = "HTTP_NOTE_FETCHING";
export const HTTP_NOTE_SUCCESS = "HTTP_NOTE_SUCCESS";
export const HTTP_NOTE_FAILED = "HTTP_NOTE_FAILED";

// NOTEview Page
export const HTTP_NOTEVIEW_FETCHING = "HTTP_NOTEVIEW_FETCHING";
export const HTTP_NOTEVIEW_SUCCESS = "HTTP_NOTEVIEW_SUCCESS";
export const HTTP_NOTEVIEW_FAILED = "HTTP_NOTEVIEW_FAILED";

// Profile Page
export const HTTP_PROFILE_FETCHING = "HTTP_PROFILE_FETCHING";
export const HTTP_PROFILE_SUCCESS = "HTTP_PROFILE_SUCCESS";
export const HTTP_PROFILE_FAILED = "HTTP_PROFILE_FAILED";

// Profile Page
export const HTTP_ADMIN_FETCHING = "HTTP_ADMIN_FETCHING";
export const HTTP_ADMIN_SUCCESS = "HTTP_ADMIN_SUCCESS";
export const HTTP_ADMIN_FAILED = "HTTP_ADMIN_FAILED";

// Profile Page
export const HTTP_CHANGEPW_FETCHING = "HTTP_CHANGEPW_FETCHING";
export const HTTP_CHANGEPW_SUCCESS = "HTTP_CHANGEPW_SUCCESS";
export const HTTP_CHANGEPW_FAILED = "HTTP_CHANGEPW_FAILED";

// Spontify frofile Page
export const HTTP_SPOTIFY_FETCHING = "HTTP_SPOTIFY_FETCHING";
export const HTTP_SPOTIFY_SUCCESS = "HTTP_SPOTIFY_SUCCESS";
export const HTTP_SPOTIFY_FAILED = "HTTP_SPOTIFY_FAILED";

// Top Music
export const HTTP_TOPMUSIC_FETCHING = "HTTP_TOPMUSIC_FETCHING";
export const HTTP_TOPMUSIC_SUCCESS = "HTTP_TOPMUSIC_SUCCESS";
export const HTTP_TOPMUSIC_FAILED = "HTTP_TOPMUSIC_FAILED";


export const SHOP_UPDATE_ORDER = "SHOP_UPDATE_ORDER";
export const SHOP_UPDATE_PAYMENT = "SHOP_UPDATE_PAYMENT";

// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK' 

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = 'Cannot connect to server, Please try again.' 
export const NETWORK_TIMEOUT_MESSAGE = 'A network timeout has occurred, Please try again.'  
export const UPLOAD_PHOTO_FAIL_MESSAGE = 'An error has occurred. The photo was unable to upload.' 


export const apiUrl =  "https://boss-node.vercel.app"; ///api/v2
export const imageUrl = "https://boss-node.vercel.app";
export const callBackUrl = "https://boss-app.vercel.app"; //for spotify

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'

export const server = {    
    LOGIN_URL : 'authen/login',    
    REGISTER_URL : 'authen/register',  
    PRODUCT_URL : 'stock/product',    
    TRANSACTION_URL : 'transaction',    
    REPORT_URL: 'stock/report',    
    LOGIN_PASSED : 'yes',
}


