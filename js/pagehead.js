document.writeln("");
document.writeln("<TABLE height=37 cellSpacing=0 cellPadding=0 width=760 align=center ");
document.writeln("bgColor=#ffffff border=0> ");
document.writeln("  <TBODY> ");
document.writeln("  <TR vAlign=top align=left> ");
document.writeln("    <TD height=44> ");
document.writeln("      <TABLE cellSpacing=0 cellPadding=0 width=\"100%\" border=0> ");
document.writeln("        <TBODY> ");
document.writeln("        <TR vAlign=top align=right> ");
document.writeln("          <TD id=showbg1 width=\"20\"><IMG height=70 src=\"images/logo_bk1.gif\" width=20 border=0></TD> ");
document.writeln("          <TD width=\"18\"><IMG height=70 src=\"images/logo_bk.gif\" width=18 border=0></TD> ");
document.writeln("          <TD width=\"18\"><IMG height=70 src=\"images/logo_bk.gif\" width=18 border=0></TD> ");
document.writeln("          <TD width=\"18\"><IMG height=70 src=\"images/logo_bk.gif\" width=18 border=0></TD> ");
document.writeln("          <TD width=\"18\"><IMG height=70 src=\"images/logo_bk.gif\" width=18 border=0></TD> ");
document.writeln("          <TD id=showbg2 valign=center align=center width=\"3%\"><img src=\"images/040517-468.gif\" align=center border=0 width=320 height=45></TD> ");
document.writeln("          <TD id=pagehead width=\"96%\" valign=center align=center height=70 ><div id=pagehead> ");
document.writeln("            <A name=topofpage></A><A  ");
document.writeln("            href=\"index.html\"><IMG height=46 ");
document.writeln("            src=\"images/logo_dg.gif\" title=\"@conby, New Media, .MOBI, Cloud Computing, Augmented Reality & Consulting\" ");
document.writeln("        border=0></A></div></TD></TR></TBODY></TABLE></TD></TR>");
/*
document.writeln("  <TR vAlign=top align=left bgColor=#ffffff> ");
document.writeln("    <TD height=31> ");
document.writeln("      <TABLE cellSpacing=1 cellPadding=0 width=760 bgColor=#ffffff border=0> ");
document.writeln("        <TBODY> ");
document.writeln("        <TR> ");
document.writeln("          <TD width=172 bgColor=#99ff99 height=25>&nbsp;</TD> ");
document.writeln("          <TD align=left width=588 bgColor=#CAFB96 height=25>&nbsp; </TD></TR> ");
document.writeln("        <TR> ");
document.writeln("          <TD width=172 bgColor=#99ff99 height=25>&nbsp;</TD> ");
document.writeln("          <TD align=left width=588 bgColor=#CAFB96 ");
document.writeln("        height=25>&nbsp;</TD></TR></TBODY></TABLE></TD></TR>");
*/
document.writeln("  <TR vAlign=top align=left bgColor=#ffffff> ");
document.writeln("    <TD height=31> ");
document.writeln("      <TABLE cellSpacing=1 cellPadding=0 width=760 bgColor=#ffffff border=0> ");
document.writeln("        <TBODY> ");
document.writeln("        <TR> ");
document.writeln("          <TD background=\"images/ppshow-01.gif\"><img width=\"760\" height=\"60\" src=\"images/ppshow-02.gif\" border=0> ");
document.writeln("	    </TD></TR></TBODY></TABLE></TD></TR>");
document.writeln("	</TBODY></TABLE> ");
document.writeln("");

function showThisDate()
{
	var months = new Array("January", "February", "March","April", "May", "June", "July", "August", "September","October", "November", "December");

	var d = new Date();
	var vYear = d.getFullYear();
	var vMonName = months[d.getMonth()];
	var vDay = d.getDate();

	document.write(vMonName);
	document.write(" ");
	document.write(vDay<10 ?  "0"+ vDay : vDay );
	document.write(",");
	document.write(vYear);
}
