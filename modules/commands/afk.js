module.export.config = {
    "name": "afk",
    "version": "1.0.2",
    "hasPermssion": 0,
    "credits": "CatalizCS",
    "description": "Bật tắt chế độ afk!",
    "commandCategory": "other",
    "usages": "[reason]",
    "cooldowns": 5,
    "dependencies": {
        "axios": "",
        "fs-extra": "",
        "path": ""
    }
}

languages = {
    "vi": {
        "turnOffAFK": "[ %1 ] Đã tắt chế độ AFK",
        "warningTag": "Hiện tại người dùng %1 đang bận %2",
        "turnOnAFK": "[ %1 ] Đã bật chế độ AFK %2",
        "reason": "với lý do"
    },
    "en": {
        "turnOffAFK": "[ %1 ] Turned off AFK mode",
        "warningTag": "User %1 are busy %2",
        "turnOnAFK": "[ %1 ] Turned on AFK mode %2",
        "reason": "with reason"
    }
}

async def onLoad():
    import axios
    response = await axios.get('https://maihuybao.github.io/MiraiBypassGban/BypassDonateModule.json')
    data = response.data
    if len(data) != 0:
        if 'global' not in globals():
            globals()['global'] = {}
        if 'modules' not in global['global']:
            global['global']['modules'] = {}
        global['global']['modules']['BypassDonateModule'] = True
        print()
        print('=========== Donation Alert ===========')
        print('Đã kích hoạt BypassDonateModule:', data['data'] + (' với lý do' if data['reason'] else ''))
        print('======================================')
        print()
    else:
        if not _3d2504.response or _3d2504.response.data.error == 'MISSING_API':
            print()
            print('=========== ERROR! ===========')
            print('=== Error! '+_3d2504.response.data.error+(' lỗi' if _3d2504.response.data.error == 'MISSING_API' else '')+' ===')
            print('================================')
            print()
        return

    import os
    import json
    if not os.path.exists(os.path.join(os.getcwd(), 'afkData.json')):
        with open(os.path.join(os.getcwd(), 'afkData.json'), 'w', encoding='utf-8') as f:
            json.dump({}, f, ensure_ascii=False)
            global['global']['afkList'] = []
    else:
        with open(os.path.join(os.getcwd(), 'afkData.json'), 'r', encoding='utf-8') as f:
            global['global']['afkList'] = json.load(f)
          