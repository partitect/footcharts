SELECT
	t.team,
	SUM ( P ) AS Play,
	SUM ( W ) AS W,
	SUM ( D ) AS D,
	SUM ( L ) AS L,
	SUM ( F ) AS GF,
	SUM ( A ) AS GA,
	SUM ( GD ) AS GD,
	SUM ( Pts ) AS Pts
FROM
	(
	SELECT
		hteam Team,
		1 P,
		hscore F,
		ascore A,
		hscore - ascore GD,
		IIF ( hscore > ascore, 1, 0 ) W,
		IIF ( hscore = ascore, 1, 0 ) D,
		IIF ( hscore < ascore, 1, 0 ) L,
CASE
	
	WHEN hscore > ascore THEN
	3 
	WHEN hscore = ascore THEN
	1 ELSE 0 
	END AS Pts 
FROM
	games 
WHERE
	hscore IS NOT NULL 
	OR ascore IS NOT NULL UNION ALL
SELECT
	ateam,
	1,
	ascore,
	hscore,
	ascore - hscore GD,
	IIF ( hscore < ascore, 1, 0 ),
	IIF ( hscore = ascore, 1, 0 ),
	IIF ( hscore > ascore, 1, 0 ),
CASE
	
	WHEN hscore < ascore THEN
	3 
	WHEN hscore = ascore THEN
	1 ELSE 0 
END 
FROM
	games 
WHERE
	hscore IS NOT NULL 
	OR ascore IS NOT NULL 
	) AS tot
	JOIN teams t ON tot.Team= t.id 
GROUP BY
	t.team 
ORDER BY
	SUM ( Pts ) DESC,
	SUM ( GD ) DESC,
	SUM ( F ) DESC