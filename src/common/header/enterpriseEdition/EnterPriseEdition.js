import React,{useState} from 'react'
import {BaseModal,HeaderDropdown} from "tiklab-licence-ui/es/commons";
import {disableFunction} from "tiklab-core-ui";
import vipLight from '../../../assets/img/vip.png';
import vipDark from '../../../assets/img/notvip.png';
import "./EnterPriseEditionStyle.scss";


const featureList = [
    {
        "id": "PostIn23f85",
        "productType": {
            "id": "postin",
            "code": null,
            "typeName": null
        },
        "type": "ce",
        "name": "PostIn-社区版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:56:46.997",
        "modelList": [
            {
                "id": "0b85aa467acc",
                "comparisonId": "PostIn23f85",
                "name": "空间模块基础功能",
                "sort": 1,
                "createTime": "2024-05-16 10:41:37.332",
                "children": [
                    {
                        "id": "6918440064ac",
                        "comparisonModelId": "0b85aa467acc",
                        "name": "空间管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:43:52.683"
                    },
                    {
                        "id": "f20861d7c4ce",
                        "comparisonModelId": "0b85aa467acc",
                        "name": "环境管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:43:57.63"
                    },
                    {
                        "id": "7b7e06727d20",
                        "comparisonModelId": "0b85aa467acc",
                        "name": " 成员管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:03.37"
                    },
                    {
                        "id": "0d48054ce9f3",
                        "comparisonModelId": "0b85aa467acc",
                        "name": "权限管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:09.535"
                    }
                ]
            },
            {
                "id": "e7b99b532f5f",
                "comparisonId": "PostIn23f85",
                "name": "接口设计模块",
                "sort": 3,
                "createTime": "2024-06-07 10:09:34.301",
                "children": []
            },
            {
                "id": "5119ca62b1df",
                "comparisonId": "PostIn23f85",
                "name": "接口文档模块",
                "sort": 4,
                "createTime": "2024-06-07 10:09:40.238",
                "children": []
            },
            {
                "id": "75c583366f97",
                "comparisonId": "PostIn23f85",
                "name": "接口调试模块",
                "sort": 5,
                "createTime": "2024-05-16 10:42:11.751",
                "children": [
                    {
                        "id": "e498921ac4fd",
                        "comparisonModelId": "75c583366f97",
                        "name": "HTTP快捷调试",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:18.345"
                    },
                    {
                        "id": "2b0f1ea8f7b1",
                        "comparisonModelId": "75c583366f97",
                        "name": "WebSocket快捷调试",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:26.281"
                    },
                    {
                        "id": "8193735b692f",
                        "comparisonModelId": "75c583366f97",
                        "name": " 测试历史",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:32.303"
                    }
                ]
            },
            {
                "id": "345c8d686701",
                "comparisonId": "PostIn23f85",
                "name": "接口MOCK模块",
                "sort": 5,
                "createTime": "2024-05-16 10:42:24.107",
                "children": [
                    {
                        "id": "83abfd77b1ab",
                        "comparisonModelId": "345c8d686701",
                        "name": " API设计",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:42.313"
                    },
                    {
                        "id": "bbf78bfe9032",
                        "comparisonModelId": "345c8d686701",
                        "name": " API文档",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:50.045"
                    },
                    {
                        "id": "58cceafea596",
                        "comparisonModelId": "345c8d686701",
                        "name": " API调试",
                        "sort": 0,
                        "createTime": "2024-05-16 10:44:56.265"
                    },
                    {
                        "id": "a7fbdf2a3522",
                        "comparisonModelId": "345c8d686701",
                        "name": "高级MOCK",
                        "sort": 0,
                        "createTime": "2024-05-16 10:45:01.479"
                    }
                ]
            },
            {
                "id": "0087a92f46e9",
                "comparisonId": "PostIn23f85",
                "name": "安全模块",
                "sort": 5,
                "createTime": "2024-05-16 10:42:30.623",
                "children": [
                    {
                        "id": "f3a3908634d0",
                        "comparisonModelId": "0087a92f46e9",
                        "name": " 系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-16 10:45:07.725"
                    },
                    {
                        "id": "b583a0385bb4",
                        "comparisonModelId": "0087a92f46e9",
                        "name": " 动态日志",
                        "sort": 0,
                        "createTime": "2024-05-16 10:45:12.934"
                    }
                ]
            },
            {
                "id": "f8b6d088ed3a",
                "comparisonId": "PostIn23f85",
                "name": "权限模块",
                "sort": 6,
                "createTime": "2024-06-07 09:55:55.358",
                "children": []
            },
            {
                "id": "811b0dae6fb8",
                "comparisonId": "PostIn23f85",
                "name": "消息模块基础功能",
                "sort": 7,
                "createTime": "2024-06-06 17:10:46.6",
                "children": []
            },
            {
                "id": "2f9834d3d5c9",
                "comparisonId": "PostIn23f85",
                "name": "用户模块基础功能",
                "sort": 8,
                "createTime": "2024-06-07 09:54:15.706",
                "children": []
            },
            {
                "id": "07277b50d0be",
                "comparisonId": "PostIn23f85",
                "name": "登录模块基础功能",
                "sort": 8,
                "createTime": "2024-06-07 10:05:13.962",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "72583272f5c3",
                "comparisonId": "PostIn23f85",
                "key": "日志保存时长",
                "values": " 不限制",
                "sort": 1,
                "createTime": "2024-06-06 16:58:28.373"
            },
            {
                "id": "ba803b5f5ad0",
                "comparisonId": "PostIn23f85",
                "key": "消息保存时长",
                "values": " 不限制",
                "sort": 1,
                "createTime": "2024-06-06 16:58:33.518"
            }
        ],
        "customerList": [
            {
                "id": "4df11a8c9bd5",
                "comparisonId": "PostIn23f85",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:47:40.313"
            },
            {
                "id": "0f8aad05bdb6",
                "comparisonId": "PostIn23f85",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:48:22.801"
            }
        ]
    },
    {
        "id": "PostIn3720e",
        "productType": {
            "id": "postin",
            "code": null,
            "typeName": null
        },
        "type": "ee",
        "name": "PostIn-企业版",
        "price": "45",
        "version": "v1.0.2",
        "createTime": "2024-03-26 10:57:07.029",
        "modelList": [
            {
                "id": "ff8a584f9773",
                "comparisonId": "PostIn3720e",
                "name": "空间模块：支持PDF格式导出",
                "sort": 0,
                "createTime": "2024-05-15 20:21:52.839",
                "children": [
                    {
                        "id": "eb0590c75a55",
                        "comparisonModelId": "ff8a584f9773",
                        "name": "PDF导出",
                        "sort": 0,
                        "createTime": "2024-05-15 20:21:56.734"
                    }
                ]
            },
            {
                "id": "e2f8854916ff",
                "comparisonId": "PostIn3720e",
                "name": "登录模块：企业微信登录、Ldap登录",
                "sort": 0,
                "createTime": "2024-05-15 20:22:24.642",
                "children": [
                    {
                        "id": "9b60f2b0fd7b",
                        "comparisonModelId": "e2f8854916ff",
                        "name": "企业微信登录",
                        "sort": 0,
                        "createTime": "2024-05-15 20:22:49.222"
                    },
                    {
                        "id": "857b4a790920",
                        "comparisonModelId": "e2f8854916ff",
                        "name": "Ldap登录",
                        "sort": 0,
                        "createTime": "2024-05-15 20:22:55.746"
                    }
                ]
            },
            {
                "id": "260df1d319bd",
                "comparisonId": "PostIn3720e",
                "name": " 用户模块：企业微信用户目录、Ldap用户目录",
                "sort": 1,
                "createTime": "2024-06-06 17:01:51.122",
                "children": []
            },
            {
                "id": "965c07a3a78c",
                "comparisonId": "PostIn3720e",
                "name": "消息模块：企业微信消息",
                "sort": 1,
                "createTime": "2024-06-07 10:01:29.345",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "40d954fdd6b3",
                "comparisonId": "PostIn3720e",
                "key": "日志保存时长",
                "values": " 不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:50:46.818"
            },
            {
                "id": "05b7c7e48bfc",
                "comparisonId": "PostIn3720e",
                "key": "消息保存时长",
                "values": " 不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:50:55.29"
            }
        ],
        "customerList": [
            {
                "id": "84701ed9d04c",
                "comparisonId": "PostIn3720e",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:51:08.474"
            },
            {
                "id": "1c7b0a974867",
                "comparisonId": "PostIn3720e",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:51:12.307"
            },
            {
                "id": "51e295471ac3",
                "comparisonId": "PostIn3720e",
                "key": null,
                "values": " 企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:51:16.258"
            },
            {
                "id": "10ece4cc1346",
                "comparisonId": "PostIn3720e",
                "key": null,
                "values": " 7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:51:20.29"
            },
            {
                "id": "d0b6e3c68c1b",
                "comparisonId": "PostIn3720e",
                "key": null,
                "values": " 提供私有化专属技术支持",
                "sort": 1,
                "createTime": "2024-05-24 21:51:26.153"
            }
        ]
    },
    {
        "id": "PostInb627",
        "productType": {
            "id": "postin",
            "code": null,
            "typeName": null
        },
        "type": "cloud-free",
        "name": "PostIn-线上免费版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:58:23.616",
        "modelList": [
            {
                "id": "1dbbb0447494",
                "comparisonId": "PostInb627",
                "name": "空间模块基础功能",
                "sort": 1,
                "createTime": "2024-05-16 10:51:32.989",
                "children": [
                    {
                        "id": "1abe9b2df040",
                        "comparisonModelId": "1dbbb0447494",
                        "name": " 空间管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:52:08.316"
                    },
                    {
                        "id": "2d23125c5de5",
                        "comparisonModelId": "1dbbb0447494",
                        "name": " 环境管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:52:14.667"
                    },
                    {
                        "id": "98cf7507825c",
                        "comparisonModelId": "1dbbb0447494",
                        "name": " 成员管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:52:20.815"
                    },
                    {
                        "id": "d60c767cf194",
                        "comparisonModelId": "1dbbb0447494",
                        "name": " 权限管理",
                        "sort": 0,
                        "createTime": "2024-05-16 10:52:28.099"
                    }
                ]
            },
            {
                "id": "2ada428a67a0",
                "comparisonId": "PostInb627",
                "name": "接口文档模块",
                "sort": 1,
                "createTime": "2024-05-16 10:51:46.532",
                "children": [
                    {
                        "id": "0f2225bbb9b6",
                        "comparisonModelId": "2ada428a67a0",
                        "name": " API设计",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:14.428"
                    },
                    {
                        "id": "5ffdc1705083",
                        "comparisonModelId": "2ada428a67a0",
                        "name": " API文档",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:19.516"
                    },
                    {
                        "id": "71a2dca98b2b",
                        "comparisonModelId": "2ada428a67a0",
                        "name": " API文档",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:24.966"
                    },
                    {
                        "id": "24cfb22e3033",
                        "comparisonModelId": "2ada428a67a0",
                        "name": " 高级MOCK",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:30.659"
                    }
                ]
            },
            {
                "id": "638891cfdd23",
                "comparisonId": "PostInb627",
                "name": "接口设计模块",
                "sort": 2,
                "createTime": "2024-06-07 10:13:07.091",
                "children": []
            },
            {
                "id": "fa9df789d788",
                "comparisonId": "PostInb627",
                "name": "接口MOCK模块",
                "sort": 2,
                "createTime": "2024-06-07 10:13:14.257",
                "children": []
            },
            {
                "id": "438fb7e8d567",
                "comparisonId": "PostInb627",
                "name": "接口调试模块",
                "sort": 3,
                "createTime": "2024-05-16 10:51:38.301",
                "children": [
                    {
                        "id": "492e14c73c44",
                        "comparisonModelId": "438fb7e8d567",
                        "name": "HTTP快捷调试",
                        "sort": 0,
                        "createTime": "2024-05-16 10:52:56.412"
                    },
                    {
                        "id": "1d3386e6f735",
                        "comparisonModelId": "438fb7e8d567",
                        "name": "WebSocket快捷调试",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:02.753"
                    },
                    {
                        "id": "b599a21f451c",
                        "comparisonModelId": "438fb7e8d567",
                        "name": " 测试历史",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:08.415"
                    }
                ]
            },
            {
                "id": "becf1b149fbd",
                "comparisonId": "PostInb627",
                "name": "权限模块",
                "sort": 3,
                "createTime": "2024-06-07 10:04:08.819",
                "children": []
            },
            {
                "id": "395e38b9b01e",
                "comparisonId": "PostInb627",
                "name": " 安全模块",
                "sort": 4,
                "createTime": "2024-05-16 10:51:52.177",
                "children": [
                    {
                        "id": "24f07f4150ce",
                        "comparisonModelId": "395e38b9b01e",
                        "name": " 系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:49.451"
                    },
                    {
                        "id": "9dda14587394",
                        "comparisonModelId": "395e38b9b01e",
                        "name": " 动态日志",
                        "sort": 0,
                        "createTime": "2024-05-16 10:53:55.702"
                    }
                ]
            },
            {
                "id": "d3c06b74ae22",
                "comparisonId": "PostInb627",
                "name": "消息模块基础功能",
                "sort": 8,
                "createTime": "2024-06-06 17:10:05.204",
                "children": []
            },
            {
                "id": "9b382a874713",
                "comparisonId": "PostInb627",
                "name": "用户模块基础功能",
                "sort": 8,
                "createTime": "2024-06-07 10:04:35.394",
                "children": []
            },
            {
                "id": "19f3b5e2bf8f",
                "comparisonId": "PostInb627",
                "name": "登录模块基础功能",
                "sort": 8,
                "createTime": "2024-06-07 10:04:45.934",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "cc3a9f7e7c00",
                "comparisonId": "PostInb627",
                "key": "人员限制",
                "values": "10人",
                "sort": 1,
                "createTime": "2024-05-24 21:49:51.445"
            }
        ],
        "customerList": [
            {
                "id": "74fd3985b547",
                "comparisonId": "PostInb627",
                "key": null,
                "values": " 应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:50:14.277"
            },
            {
                "id": "64e7c6e8fe7c",
                "comparisonId": "PostInb627",
                "key": null,
                "values": " 在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:50:18.625"
            }
        ]
    },
    {
        "id": "PostIn062be",
        "productType": {
            "id": "postin",
            "code": null,
            "typeName": null
        },
        "type": "cloud-pay",
        "name": "PostIn-线上付费版",
        "price": "15",
        "version": null,
        "createTime": "2024-03-26 10:59:30.937",
        "modelList": [
            {
                "id": "62e297338ce5",
                "comparisonId": "PostIn062be",
                "name": "空间模块：支持PDF格式导出",
                "sort": 1,
                "createTime": "2024-05-24 21:59:06.226",
                "children": [
                    {
                        "id": "656f241c10fb",
                        "comparisonModelId": "62e297338ce5",
                        "name": "企业微信登录",
                        "sort": 1,
                        "createTime": "2024-05-24 21:59:11.489"
                    },
                    {
                        "id": "41b74127a5b3",
                        "comparisonModelId": "62e297338ce5",
                        "name": "Ldap登录",
                        "sort": 1,
                        "createTime": "2024-05-24 21:59:16.485"
                    }
                ]
            },
            {
                "id": "17defa6cd329",
                "comparisonId": "PostIn062be",
                "name": " 登录模块：企业微信登录、Ldap登录",
                "sort": 1,
                "createTime": "2024-05-24 21:59:34.735",
                "children": [
                    {
                        "id": "1cddc1439df6",
                        "comparisonModelId": "17defa6cd329",
                        "name": "同步企业微信",
                        "sort": 1,
                        "createTime": "2024-05-24 21:59:39.856"
                    },
                    {
                        "id": "c1ad996ff783",
                        "comparisonModelId": "17defa6cd329",
                        "name": " 同步Ldap",
                        "sort": 1,
                        "createTime": "2024-05-24 21:59:44.393"
                    }
                ]
            },
            {
                "id": "0272167bd0fb",
                "comparisonId": "PostIn062be",
                "name": " 消息模块：企业微信消息",
                "sort": 1,
                "createTime": "2024-06-06 17:11:58.964",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "baa4b2847fe2",
                "comparisonId": "PostIn062be",
                "key": "人员",
                "values": " 不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:55:17.925"
            }
        ],
        "customerList": [
            {
                "id": "d677a0acdf81",
                "comparisonId": "PostIn062be",
                "key": null,
                "values": " 在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:55:27.38"
            },
            {
                "id": "43d206c14511",
                "comparisonId": "PostIn062be",
                "key": null,
                "values": " 企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:55:30.989"
            },
            {
                "id": "12aa8c0783a9",
                "comparisonId": "PostIn062be",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:55:34.813"
            },
            {
                "id": "ec5a56dd40e0",
                "comparisonId": "PostIn062be",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:55:40.02"
            }
        ]
    }
]

/**
 * 应用管理产品特性
 * @param props
 * @constructor
 */
const EnterPriseEdition = props =>{

    const {featureType = 'ee'} = props;

    const isVip = disableFunction();

    const [visible,setVisible] = useState(false);

    const onOk = () =>{
        if(featureType==='ee'){
            window.open(`https://tiklab.net/account/subscribe/apply/postin`)
        } else {
            window.open(`https://work.tiklab.net/#/enterprise/application/postin`)
        }
        onCancel()
    }

    const onCancel = () =>{
        setVisible(false)
    }

    const featureHtml = type => {
        let item = featureList.find(li => li.type === type);
        return (
            <div className='feature-item'>
                <div className='feature-item-header'>
                    <div className='header-title'>
                        {type==='ce' && '社区版'}
                        {type==='ee' && '企业版'}
                        {type==='cloud-free' && '免费版' }
                        {type==='cloud-pay' && '专业版' }
                    </div>
                    <div className='header-desc'>
                        {type==='ce' && '适用于个人和小型团队快速部署和使用。'}
                        {type==='ee' && '适用于大型组织和企业的复杂需求。'}
                        {type==='cloud-free' && '适用于个人和小型团队快速部署和使用。' }
                        {type==='cloud-pay' && '适用于大型组织和企业的复杂需求。' }
                    </div>
                </div>
                <div className='feature-item-body'>
                    <div className='feature-item-body-model'>
                        <div className='feature-item-body-title'>
                            <span>功能</span>
                            {
                                type==='cloud-pay' &&
                                <span className='feature-item-body-title-ex'>
                                    包含免费版所有功能
                                </span>
                            }
                        </div>
                        <div>
                            {
                                item?.modelList?.map(model=>(
                                    <div key={model.id} className='feature-model-item'>
                                        <div className='feature-item-body-icon'></div>
                                        <div className='feature-model-item-name'>{model.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-resources'>
                        <div className='feature-item-body-title'>资源</div>
                        <div>
                            {
                                item?.resourcesList?.map(resources=>{
                                    return (
                                        <div key={resources.id} className='feature-resources-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-resources-item-key'>{resources?.key}：</div>
                                            <div className='feature-resources-item-values'>{resources?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-customer'>
                        <div className='feature-item-body-title'>服务</div>
                        <div>
                            {
                                item?.customerList?.map(customer=>{
                                    return (
                                        <div key={customer.id} className='feature-customer-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-customer-item-value'>{customer?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <HeaderDropdown
            visible={visible}
            setVisible={setVisible}
            type={'applink'}
            tooltip={isVip ? "免费版" : "企业版"}
            Icon={<img src={isVip ? vipDark : vipLight} alt={"vip"} width={24} height={24}/>}
        >
            <BaseModal
                width={700}
                title={"版本功能"}
                okText={'订阅'}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div className='application-feature-modal'>
                    {featureHtml(featureType===''?'ce':'cloud-free')}
                    {featureHtml(featureType==='ee'?'ee':'cloud-pay')}
                </div>
            </BaseModal>
        </HeaderDropdown>
    )
}

export default EnterPriseEdition

