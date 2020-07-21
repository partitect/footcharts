SELECT DISTINCT
p.id,
t1.team AS HOMETEAM,
p.hscore,
p.ascore,
t2.team AS AWAYTEAM,
p.[date],
p.week_id,
t1.logo AS t1logo,
t2.logo AS t2logo,
dbo.stadiums.stadium,
t1.color1 as t1color1,
t1.color2 as t1color2,
t2.color1 as t2color1,
t2.color2 as t2color2,
ref.referee
FROM
dbo.games AS p
LEFT JOIN dbo.teams AS t1 ON t1.id = p.hteam
LEFT JOIN dbo.teams AS t2 ON t2.id = p.ateam
LEFT OUTER JOIN dbo.stadiums ON dbo.stadiums.id = t1.stadium_id
LEFT OUTER JOIN dbo.referees ref ON ref.id = p.referee_id
WHERE
t1.league_id = '6'
ORDER BY
p.[date] ASC
