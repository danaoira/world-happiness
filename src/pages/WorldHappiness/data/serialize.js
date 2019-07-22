const serialize = (d) => ({
  country: d['Country (region)'],
  ladder: +d['Ladder'],
  ladderSD: +d['SD of Ladder'],
  positiveAffect: +d['Positive affect'],
  negativeAffect: +d['Negative affect'],
  socialSupport: +d['Social support'],
  freedom: +d['Freedom'],
  corruption: +d['Corruption'],
  generosity: +d['Generosity'],
  gdpPerCapita: +d['Log of GDP per capita'],
  lifeExpectancy: +d['Healthy life expectancy']
})

export default serialize