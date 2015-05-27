package com.guodu.Client;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/* ========================================================
 * �������������Ƽ����޹�˾
 * �� �ڣ�2012-12-18  ����10:04:19
 * �� �ߣ�wangjialong
 * �� ����0.1
 * =========================================================
 */
public class GuoDuDEMO {
	/**
	 * ����DEMO�з������������в����ֶΣ���һЩ�ֶ�Ϊ�̶�ֵ���û������޸Ļ������з�װ�µķ����������������
	 * DEMO�а�����ֻʹ����post��ʽ�����ڸ��Ի����Ű��Ƚϴ����Զ���post��ʽ�������Ƚ�Сʱ �û�����ʹ��get��ʽ���ڴ˾Ͳ����ṩʾ���ˡ�
	 */
	public static void main(String args[])
	{
		/*�������������μ�post����ͷ��*/
		/*����д�����û������� username=�û�����password=����*/
		 String username="fxing";
		 String password="234iweoe";
		 String  SendTime = "";
		 String AppendID = "";
		 
		 String Contentsingle="����DEMO,������Ϣ";
		 String Contentbatch="����DEMO,������Ϣ";
		 String ContentsSynamic[]={"����DEMO,������Ϣ1","����DEMO,������Ϣ2"};
		 
		 String DesMobilesingle[]={"15810708705"};
		 String DesMobile2batch[]={"15810708705","15810708705"};
		 String DesMobileSynamic[]={"15810708705","15810708705"};
		 
		 GuoDuDEMO gd=new GuoDuDEMO();
		/*post��ʽ���͵�����Ϣ*/
		String singleResponse=gd.postSendMsg(username, password, Contentsingle, DesMobilesingle, AppendID, SendTime);
		
		/*post��ʽ����������Ϣ*/
		//String batchResponse=gd.postSendMsg(username, password, Contentbatch, DesMobile2batch, AppendID, SendTime);
		
		/*post��ʽ���͸��Ի���Ϣ*/
		//String SynamicResponse =gd.postSendSynamicMsg (username, password, ContentsSynamic, DesMobileSynamic, AppendID, SendTime);
		
		/*��ӡ������Ӧ����ӦΪ�Զ����ʽ���û��õ���Ӧ������Զ����ֽ��������������Ӧ�еĲ������Ա��߼�����*/
		/*post������Ӧ����*/
		System.out.println("������ʽ���ص���ӦΪ��"+singleResponse);
		/*post������Ӧ����*/
		//System.out.println("������ʽ���ص���ӦΪ��"+batchResponse);
		/*post���Ի���Ӧ����*/
		//System.out.println("���Ի���ʽ���ص���ӦΪ��"+SynamicResponse);
	}

	
	/**post��ʽ ���͵�����������Ϣ*/
	/**
	 * @param OperID   		�û��� 
	 * @param OperPass   	����
	 * @param Content   	������������  						������ò�Ҫ����500���ַ������������GBK��
	 * @param DesMobiles[]  ��Ҫ���͵��ֻ����ַ�������   			�ֻ��Ÿ����벻Ҫ����500����
	 * @param AppendID    	�û�����չ�ĺ��� ��					����չ����д���룬������չ����д"",ע�⣡ͨ����+�����û���ݺ�+AppendID�ܳ����ܳ���20λ�����򽫷���ʧ�ܡ�������붨�壬��μ���������ͨƽ̨�ӿ��ĵ�
	 * @param SendTime   	����ʱ��  							���Ϊ��ʱ��Ϣ������д����ʽΪyyyyMMddhhmmss 14λ ��Ϊʵʱ��Ϣ������"";
	 * @return rec_string  	�������ص������ʽ�Ĵ�				
	 * @catch Exception
	 */
	public  String postSendMsg(String OperID,String OperPass,String Content,String DesMobiles[],String AppendID,String SendTime)  {
		/*��������URLEncoder������GBK*/
		String EncoderContent = "";
		try {
			EncoderContent = URLEncoder.encode(Content, "GBK");
			EncoderContent=URLEncoder.encode(EncoderContent, "GBK");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		/*���ֻ��Ŵ�����ת���һ���ö��ŷֿ����ַ������ַ���ĩβ�ж��Ų�Ӱ����Ϣ�·���*/
		String DesMobile="";
		for(int i=0;i<DesMobiles.length;i++) {
    		DesMobile = DesMobiles[i]+","+DesMobile;
    	}
		
		/*url��ַ*/
		String URL="http://221.179.180.158:9008/HttpQuickProcess/submitMessageAll";
		
		/*��Ϣ����*/
		String str="OperID="+OperID+"&OperPass="+OperPass+"&SendTime="+SendTime+"&AppendID="+AppendID+"&DesMobile="+DesMobile.trim()+"&Content="+EncoderContent;
		
		System.out.println("���͵�����Ϊ��"+str);
		/*ʹ��post��ʽ������Ϣ*/
		String response=this.postURL(str, URL);
		
		/*������Ӧ*/
		return response;
		
	}

	
	/**post��ʽ ���͸��Ի���Ϣ*/
	/**
	 * @param OperID   		�û��� 
	 * @param OperPass   	����
	 * @param Content[]   	������������  						ÿ��������ò�Ҫ����500���ַ�����ע��ʾ���б��뷽ʽ
	 * @param DesMobiles[]  ��Ҫ���͵��ֻ����ַ�������   			�ֻ��Ÿ����벻Ҫ����500����
	 * @param AppendID    	�û�����չ�ĺ��� ��					����չ����д���룬������չ����д"",ע�⣡ͨ����+�����û���ݺ�+AppendID�ܳ����ܳ���20λ�����򽫷���ʧ�ܡ�������붨�壬��μ���������ͨƽ̨�ӿ��ĵ�
	 * @param SendTime   	����ʱ��  							���Ϊ��ʱ��Ϣ������д����ʽΪyyyyMMddhhmmss 14λ ��Ϊʵʱ��Ϣ������"";
	 * @return rec_string  	�������ص������ʽ�Ĵ�				
	 * @catch Exception
	 */
	public  String postSendSynamicMsg(String OperID,String OperPass,String Content[],String DesMobiles[],String AppendID,String SendTime) {
		
		/*�ж��ֻ��Ÿ����������Ƿ����*/
		int contentLength=Content.length;
		int desmobileLength=DesMobiles.length;
		
		if(contentLength!=desmobileLength)
		{
			return "�ֻ�������������ݸ�������ͬ";
		}
		
		/*�����ݴ������в�ֳ�����ÿ��������URLEncoder��һ��GBK��֮���������ٽ���һ��URLEncoder��GBK*/
		String EncoderContent = "";
		try {
			for(int i=0;i<contentLength;i++)
			{
				String StringTemp= URLEncoder.encode(Content[i], "GBK");
				EncoderContent+=StringTemp+",";
			}
			EncoderContent = URLEncoder.encode(EncoderContent, "GBK");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		/*���ֻ��Ŵ�����ת���һ���ö��ŷֿ����ַ������ַ���ĩβ�ж��Ų�Ӱ����Ϣ�·���*/
		String DesMobile="";
		for(int i=0;i<DesMobiles.length;i++) {
    		DesMobile = DesMobiles[i]+","+DesMobile;
    	}
		
		/*url��ַ*/
		String URL="http://221.179.180.158:9008/HttpQuickProcess/submitMessageAll";
		
		/*��Ϣ����*/
		String str="OperID="+OperID+"&OperPass="+OperPass+"&SendTime="+SendTime+"&AppendID="+AppendID+"&DesMobile="+DesMobile.trim()+"&Content="+EncoderContent;
		
		System.out.println("���͵�����Ϊ��"+str);
		/*ʹ��post��ʽ������Ϣ*/
		String response=this.postURL(str, URL);
		
		/*������Ӧ*/
		return response;
		
	}

	
	
	
	/**post��ʽ ����url��*/
	/**
	 * @param commString   ��Ҫ���͵�url������
	 * @param address   	��Ҫ���͵�url��ַ
	 * @return rec_string  �������ص��Զ����ʽ�Ĵ�
	 * @catch Exception
	 */
	public  String postURL(String commString, String address) {
		String rec_string = "";
		URL url = null;
		HttpURLConnection urlConn = null;
		try {
			/*�õ�url��ַ��URL��*/
			url = new URL(address);
			/*��ô���Ҫ���͵�url����*/
			urlConn = (HttpURLConnection) url.openConnection();
			/*�������ӳ�ʱʱ��*/
			urlConn.setConnectTimeout(30000);
			/*���ö�ȡ��Ӧ��ʱʱ��*/
			urlConn.setReadTimeout(30000);
			/*����post���ͷ�ʽ*/
			urlConn.setRequestMethod("POST");
			/*����commString*/
			urlConn.setDoOutput(true);
			OutputStream out = urlConn.getOutputStream();
			out.write(commString.getBytes());
			out.flush();
			out.close();
			/*������� ��ȡ������������������*/
			BufferedReader rd = new BufferedReader(new InputStreamReader(urlConn.getInputStream(), "GBK"));
			StringBuffer sb = new StringBuffer();
			int ch;
			while ((ch = rd.read()) > -1) {
				sb.append((char) ch);
			}
			rec_string = sb.toString().trim();
			/*������Ϲر�������*/
			rd.close();
		} catch (Exception e) {
			/*�쳣����*/
			rec_string = "-107";
			System.out.println(e);
		} finally {
			/*�ر�URL����*/
			if (urlConn != null) {
				urlConn.disconnect();
			}
		}
		/*������Ӧ����*/
		return rec_string;
	}
	

}

