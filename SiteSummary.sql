
SELECT Seasons.SeasonName, districts.DistrictName, sectors.SectorName, Sites.SiteName, Groups.GroupName, COUNT(Groups.GroupName) AS total_active_groups FROM Seasons 
INNER JOIN districts
on districts.DistrictID = 5
INNER JOIN Sites
on Seasons.SeasonName = 'Mar. 2011, Long Rain' AND Seasons.SeasonID = Sites.FirstSeason OR Seasons.SeasonID = Sites.LastSeason
INNER JOIN Groups
on Groups.Active = 1 AND Groups.SiteID = Sites.SiteID
INNER JOIN sectors
on Seasons.SeasonName = 'Mar. 2011, Long Rain' AND districts.DistrictID = 5 AND Seasons.SeasonID = sectors.FirstSeason OR Seasons.SeasonID = sectors.LastSeason GROUP BY Sites.SiteName ORDER BY Sectors.SectorName ASC, Sites.SiteName ASC;


/* Notes: The tables lack indexing: primary keys, unique keys and foreign keys*/


SELECT Seasons.SeasonName, districts.DistrictName, sectors.SectorName, Sites.SiteName, Groups.GroupName, COUNT(Groups.GroupName) AS GroupCount, COUNT(clients.FirstName) AS ClientCount, SUM(seasonclientinputchoices.Acres) AS TotalLandSize FROM Seasons 
INNER JOIN districts
on districts.DistrictID = 5
INNER JOIN Sites
on Seasons.SeasonName = 'Mar. 2011, Long Rain' AND Seasons.SeasonID = Sites.FirstSeason OR Seasons.SeasonID = Sites.LastSeason
INNER JOIN seasonclients
on  Seasons.SeasonID = seasonclients.SeasonID
INNER JOIN clients
on clients.Deceased = 0 AND seasonclients.ClientID = clients.ClientID
INNER JOIN Groups
on Groups.Active = 1 AND seasonclients.GroupID = Groups.GroupID
INNER JOIN seasonclientinputchoices
on Seasons.SeasonID = seasonclientinputchoices.SeasonID AND  clients.ClientID = seasonclientinputchoices.ClientID
INNER JOIN sectors
on Seasons.SeasonName = 'Mar. 2011, Long Rain' AND districts.DistrictID = 5 AND Seasons.SeasonID = sectors.FirstSeason OR Seasons.SeasonID = sectors.LastSeason GROUP BY Sites.SiteName ORDER BY Sectors.SectorName ASC, Sites.SiteName ASC;
