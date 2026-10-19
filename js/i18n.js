/**
 * 中英文翻译数据
 */

const translations = {
  zh: {
    'lang.label': 'EN',

    'nav.about': '关于',
    'nav.honors': '荣誉',
    'nav.service': '学工',
    'nav.research': '科研',
    'nav.projects': '项目',
    'nav.photos': '摄影',
    'nav.contact': '联系',

    'intro.hi': '你好，我是',
    'intro.name': '郑博文',
    'intro.desc': '生物信息学专业大三本科生。',
    'intro.loc': '📍 浙江大学爱丁堡大学联合学院 (ZJE) · 生物信息学',

    'about.title': '关于',
    'about.p1': '我叫郑博文，是浙江大学爱丁堡大学联合学院（Zhejiang University - University of Edinburgh Institute, ZJE）生物信息学专业的大三本科生。我在校学习成绩优异，曾荣获浙江省政府奖学金。从大一起，我就在学院刘琬璐老师实验室接受科研训练。大二暑假，我前往北京生命科学研究所（NIBS）在生物信息中心黎斌老师的指导下进行了暑期实习。未来，我希望在 AI for Science 方面继续深耕，用新技术、新手段助力计算科学和生物医学的交叉发展。',
    'about.p2': '学业之外，我也有诸多爱好：摄影，阅读，音乐……虽不精通，却皆有浅尝；常希望时间能慢下来，让镜头留住细碎温柔，让书页容纳万千心绪，让旋律抚平日常匆忙。在热爱里沉淀自我，于方寸中窥见本真。',

    'honors.title': '荣誉与奖项',
    'honors.item1': '浙江省政府奖学金（2024-25）',
    'honors.item2': '浙江大学二等奖学金',
    'honors.item3': '浙江大学爱丁堡大学联合学院二等奖学金',
    'honors.item4': '美国大学生数学建模竞赛（MCM）— Meritorious Winner, COMAP, Problem A',
    'honors.photoAlt': '浙江省政府奖学金颁奖合影，郑博文位于左起第三位',
    'honors.photoCaption': '浙江省政府奖学金颁奖合影（左三）',

    'service.title': '学生工作',
    'service.item1': '浙江大学国际联合学院学生会文宣与新媒体中心干事（2024-25）',
    'service.item2': '浙江大学爱丁堡大学联合学院（ZJE）学生视频团队 LENS 副负责人',
    'service.item3': '浙江大学国际联合学院综合办融媒体中心负责人',

    'research.title': '科研经历',
    'research.lab': '刘琬璐课题组',
    'research.affil': '浙江大学爱丁堡大学联合学院',
    'research.period': '2025.3 — 至今',
    'research.project': '强直性脊柱炎（AS）跨器官单细胞研究：探索肠道—关节轴的免疫细胞状态与跨组织免疫联系',
    'research.skill1': '参与 CD8⁺ T 细胞计算分析，比较外周血（PBMC）与肠道中 KIR⁺ / KIR⁻ 细胞的转录特征',
    'research.skill2': '按供者汇总表达量，使用 pseudobulk 与 edgeR 开展差异表达分析，并结合基因模块打分比较细胞状态',
    'research.skill3': '使用 Slingshot 探索 CD8⁺ T 细胞状态轨迹，评估供者留一、主成分数量及起点设置对结果的影响',
    'research.skill4': '运用 Python、R 与 Linux 环境进行数据处理、统计分析和结果可视化',
    'research.skill5': '组会报告与 Journal Club 文献研讨',

    'research2.lab': '黎斌课题组',
    'research2.affil': '北京生命科学研究所（NIBS）生物信息中心',
    'research2.period': '2026 暑期',
    'research2.skill1': '为大语言模型开发文献靶点挖掘自动化管线（Harness）',
    'research2.photoAlt': '郑博文与北京生命科学研究所所长王晓东在暑期训练计划结营典礼上的合影',
    'research2.photoCaption': '在 NIBS 暑期训练计划结营典礼上与王晓东所长合影。',

    'projects.title': '项目',
    'projects.research': '科研项目',
    'projects.personal': '个人项目',
    'projects.demo': '链接',
    'projects.appgallery': 'AppGallery',
    'projects.miniprogram': '小程序码',
    'projects.miniprogramAlt': 'Lens-Workbench 微信小程序码',
    'projects.miniprogramHint': '微信扫一扫',
    'projects.source': '代码',

    'photos.title': '摄影',
    'photos.intro': '瞬间永恒。',
    'film.title': '胶片',
    'film.intro': '慢一点，留住记忆。点击暗盒，展开胶片。',
    'film.open': '→ 拉出胶片',
    'film.close': '← 收回胶片',
    'film.empty': '这一卷的照片即将入册。',

    'contact.title': '联系',
    'contact.text': '欢迎通过邮件或 GitHub 交流。',

    'footer.copy': '© 2026 Bowen Zheng'
  },

  en: {
    'lang.label': '中',

    'nav.about': 'About',
    'nav.honors': 'Honors',
    'nav.service': 'Service',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.photos': 'Photos',
    'nav.contact': 'Contact',

    'intro.hi': "Hi, I'm",
    'intro.name': 'Bowen Zheng',
    'intro.desc': 'A junior undergraduate in Bioinformatics.',
    'intro.loc': '📍 Zhejiang University - University of Edinburgh Institute (ZJE) · Bioinformatics',

    'about.title': 'About',
    'about.p1': "I'm Bowen Zheng, a junior undergraduate in Bioinformatics at the Zhejiang University - University of Edinburgh Institute (ZJE). I have maintained strong academic performance and was awarded the Zhejiang Provincial Government Scholarship. Since my freshman year, I've been conducting research in Dr. Wanlu Liu's lab at ZJE. In the summer of my sophomore year, I completed an internship at the National Institute of Biological Sciences (NIBS) in Beijing, working under Dr. Bin Li at the Bioinformatics Center. Looking ahead, I aspire to deepen my work in AI for Science — leveraging new technologies to advance the intersection of computational science and biomedicine.",
    'about.p2': 'Beyond academics, I find joy in photography, reading, and music. I claim no mastery in any, yet each offers its own rhythm: the shutter freezing fleeting moments, the pages holding boundless thoughts, the melodies quieting the rush of daily life. In these passions, I settle into myself and catch glimpses of what truly matters.',

    'honors.title': 'Honors & Awards',
    'honors.item1': 'Zhejiang Provincial Government Scholarship (2024-25)',
    'honors.item2': 'Zhejiang University Second-Class Scholarship',
    'honors.item3': 'ZJE Second-Class Scholarship',
    'honors.item4': 'Mathematical Contest in Modeling (MCM) — Meritorious Winner, COMAP, Problem A',
    'honors.photoAlt': 'Zhejiang Provincial Government Scholarship award ceremony group photo; Bowen Zheng is third from the left',
    'honors.photoCaption': 'Zhejiang Provincial Government Scholarship award ceremony (third from the left).',

    'service.title': 'Leadership & Service',
    'service.item1': 'Staff member, Culture, Publicity & New Media Center, Student Union of International Campus, Zhejiang University (2024-25)',
    'service.item2': 'Deputy Head of LENS, the student video team at Zhejiang University - University of Edinburgh Institute (ZJE)',
    'service.item3': 'Head of the Integrated Media Center, General Office of International Campus, Zhejiang University',

    'research.title': 'Research Experience',
    'research.lab': 'LAB W',
    'research.affil': 'ZJU - University of Edinburgh Institute',
    'research.period': '2025.3 — Present',
    'research.project': 'Cross-organ single-cell study of ankylosing spondylitis (AS), investigating immune cell states and cross-tissue immune links along the gut–joint axis',
    'research.skill1': 'Contributed to CD8⁺ T-cell computational analyses, comparing transcriptional profiles of KIR⁺ and KIR⁻ cells in peripheral blood (PBMC) and gut tissue',
    'research.skill2': 'Aggregated expression by donor for pseudobulk differential expression analysis with edgeR, complemented by gene module scoring to compare cell states',
    'research.skill3': 'Explored CD8⁺ T-cell state trajectories with Slingshot and assessed sensitivity to donor exclusion, the number of principal components, and root selection',
    'research.skill4': 'Processed data, performed statistical analyses, and visualized results using Python and R in a Linux environment',
    'research.skill5': 'Group meetings & Journal Club presentations',

    'research2.lab': 'Li Lab',
    'research2.affil': 'Bioinformatics Center, National Institute of Biological Sciences (NIBS), Beijing',
    'research2.period': 'Summer 2026',
    'research2.skill1': 'Developed an automated literature target mining harness for large language models',
    'research2.photoAlt': 'Bowen Zheng with NIBS Director Xiaodong Wang at the Summer Training Program closing ceremony',
    'research2.photoCaption': 'With NIBS Director Xiaodong Wang at the Summer Training Program closing ceremony.',

    'projects.title': 'Projects',
    'projects.research': 'Research Projects',
    'projects.personal': 'Personal Projects',
    'projects.demo': 'Demo',
    'projects.appgallery': 'AppGallery',
    'projects.miniprogram': 'Mini Program',
    'projects.miniprogramAlt': 'Lens-Workbench WeChat Mini Program code',
    'projects.miniprogramHint': 'Scan with WeChat',
    'projects.source': 'Code',

    'photos.title': 'Photography',
    'photos.intro': 'Moments made eternal.',
    'film.title': 'On film',
    'film.intro': 'A slower way to remember. Click a canister to unroll.',
    'film.open': '→ Unroll',
    'film.close': '← Roll back',
    'film.empty': 'Photographs from this roll are coming soon.',

    'contact.title': 'Contact',
    'contact.text': 'Feel free to reach out via email or GitHub.',

    'footer.copy': '© 2026 Bowen Zheng'
  }
};
