import React from 'react';
import './../assets/style.css';

import { useNavigate } from '@shopify/app-bridge-react';
import { Link, Icon } from '@shopify/polaris';

import
{
    HomeMajor,
    MarketingMajor,
} from '@shopify/polaris-icons';

const CustomSidebar = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="sidebar">
           <div className="sidebar-top">
               {/* <i class="logo fa-brands fa-sketch"></i> */}
               <Icon source={HomeMajor} color="subdued" />
               {/* <span class="brand">Home</span> */}
           </div>
           <div className="sidebar-content">
               <ul className="list">
                        <li className='list-item'>
                            <Link onClick={() => navigate('https://addwishlistking.myshopify.com/admin/apps/choco-app-5/pagename')}>
                                <Icon source={MarketingMajor} color="subdued" />
                            </Link>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                        </li>
                        <li className='list-item'>
                    <div className="list-item-inside">
                                <Icon source={MarketingMajor} color="subdued" />
                    </div>
                  </li>
               </ul>
           </div>
       </div>
       </>
    )
}

export default CustomSidebar
